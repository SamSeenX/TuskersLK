#!/usr/bin/env bash
set -e

BASE_DIR="public/images/elephants"
ARCHIVE_DIR="$BASE_DIR/archive"
P480_DIR="$BASE_DIR/480p"
P1200_DIR="$BASE_DIR/1200p"

mkdir -p "$ARCHIVE_DIR" "$P480_DIR" "$P1200_DIR"

for img in "$ARCHIVE_DIR"/*.jpg; do
  [ -f "$img" ] || continue
  base=$(basename "$img" .jpg)

  echo "Optimizing $base..."

  # 1. Full-size WebP (max width 1200, quality 80)
  cwebp -q 80 -resize 1200 0 "$img" -o "$P1200_DIR/${base}.webp" > /dev/null 2>&1 || cwebp -q 80 "$img" -o "$P1200_DIR/${base}.webp" > /dev/null 2>&1

  # 2. Thumbnail WebP (max width 480, quality 75)
  cwebp -q 75 -resize 480 0 "$img" -o "$P480_DIR/${base}.webp" > /dev/null 2>&1 || cwebp -q 75 "$img" -o "$P480_DIR/${base}.webp" > /dev/null 2>&1

  # 3. Full-size AVIF (max width 1200, quality 65)
  tmp_full="/tmp/${base}_1200.jpg"
  sips -Z 1200 "$img" --out "$tmp_full" > /dev/null 2>&1
  avifenc --min 0 --max 63 -a end-usage=q -a cq-level=28 -s 6 "$tmp_full" "$P1200_DIR/${base}.avif" > /dev/null 2>&1
  rm -f "$tmp_full"

  # 4. Thumbnail AVIF (max width 480, quality 60)
  tmp_thumb="/tmp/${base}_480.jpg"
  sips -Z 480 "$img" --out "$tmp_thumb" > /dev/null 2>&1
  avifenc --min 0 --max 63 -a end-usage=q -a cq-level=32 -s 6 "$tmp_thumb" "$P480_DIR/${base}.avif" > /dev/null 2>&1
  rm -f "$tmp_thumb"
done

echo "Image optimization complete."
