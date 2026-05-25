"""
Convert public/hero.png to public/hero.jpg at sensible web sizes.
Photos compress 5-10x better in JPG than PNG, with no visible loss
at quality ~85 for portrait photography.
"""

from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).parent.parent
SRC = ROOT / "public" / "hero.png"
DST = ROOT / "public" / "hero.jpg"

# The frame on the homepage is max 320 CSS pixels wide.
# At 3x DPR (iPhone Pro Max retina) that's 960px source.
# We cap at 1200 wide for headroom; PIL preserves aspect ratio.
MAX_WIDTH = 1200
QUALITY = 85

img = Image.open(SRC)
# Honor the EXIF orientation so portrait phone photos don't appear sideways
img = ImageOps.exif_transpose(img)
# Strip alpha (JPG has no alpha; the matte is white anyway)
if img.mode in ("RGBA", "LA", "P"):
    bg = Image.new("RGB", img.size, (255, 255, 255))
    bg.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
    img = bg
else:
    img = img.convert("RGB")

if img.width > MAX_WIDTH:
    new_h = round(img.height * MAX_WIDTH / img.width)
    img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)

img.save(DST, "JPEG", quality=QUALITY, optimize=True, progressive=True)

src_kb = SRC.stat().st_size / 1024
dst_kb = DST.stat().st_size / 1024
print(f"hero.png  {src_kb:8.1f} KB  ({img.width}x{img.height} original)")
print(f"hero.jpg  {dst_kb:8.1f} KB  ({img.width}x{img.height} resized)")
print(f"savings   {(1 - dst_kb / src_kb) * 100:.1f}%")
