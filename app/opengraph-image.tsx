import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Motion Flow, the motion studio for cybersecurity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const svg = await readFile(join(process.cwd(), "public/logo.svg"), "utf8");
  const mark = svg
    .replace(/<rect[^>]*><\/rect>|<rect[^>]*\/>/, "")
    .replace(/viewBox="[^"]*"/, 'viewBox="165 98 765 752"')
    .replace(/fill="#ffffff"/g, 'fill="#F5F7FA"');
  const src = `data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0D13",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(108,133,235,0.32), rgba(11,13,19,0) 55%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={258} height={254} />
      </div>
    ),
    size
  );
}
