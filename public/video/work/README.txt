Hover-preview videos for the Work grid.

Export compressed web versions of the Drive masters into this folder with
these exact filenames (H.264 mp4, 720p, no audio, ideally under ~8 MB each;
a 10-15s loop of the best section beats the full film for hover previews):

  wafersight.mp4          <- Wafersight_v05+sfx_HQ.mp4 (2d animations)
  orally.mp4              <- orally.mp4 (2d animations)
  tooltip.mp4             <- ToolTip.mp4 (2d animations)
  figmatica.mp4           <- showreel Figmatica.mp4 (2d animations)
  platinum.mp4            <- Platinum.mp4 (2d animations)
  woodland-eco.mp4        <- WoodLandEco.mp4 (2d animations)
  miggles.mp4             <- Miggles.mp4 (3d animations)
  hyper.mp4               <- Hyper.mp4 (3d animations)
  venom.mp4               <- Venom_Movie_3d.mp4 (3d animations)
  kind-sigma-glasses.mp4  <- Kind-Sigma-Glasses.mp4 (3d animations)

ffmpeg one-liner per file (trims to 12s, scales to 720p, strips audio):
  ffmpeg -i INPUT.mp4 -t 12 -vf scale=-2:720 -c:v libx264 -crf 28 -preset slow -an -movflags +faststart OUTPUT.mp4

Cards work without these files; posters simply stay static until a video exists.
