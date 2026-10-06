import cv2
import numpy as np
import os
import json

# Ensure target directories exist
os.makedirs("public/frames", exist_ok=True)

video_path = "public/character.mp4"
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error opening {video_path}")
    exit(1)

total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
duration = total_frames / fps if fps > 0 else 0

print(f"--- Video Analysis ---")
print(f"Total Frames: {total_frames}, FPS: {fps}, Resolution: {width}x{height}, Duration: {duration:.2f}s")

# Load all frames into memory sequentially for fast extraction
all_frames = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    all_frames.append(frame)
cap.release()

print(f"Successfully loaded {len(all_frames)} frames into memory.")

# Sample background color
bg_bgr = np.median([
    all_frames[0][10, 10],
    all_frames[0][10, -10],
    all_frames[0][-10, 10],
    all_frames[0][-10, -10],
    all_frames[100][10, 10],
    all_frames[200][10, 10]
], axis=0)
bg_rgb = [int(bg_bgr[2]), int(bg_bgr[1]), int(bg_bgr[0])]
bg_hex = f"#{bg_rgb[0]:02X}{bg_rgb[1]:02X}{bg_rgb[2]:02X}"
print(f"Target Background Color: RGB={bg_rgb}, HEX={bg_hex}")

# Compass direction keyframes identified:
# 0 rad (0°): RIGHT -> Frame 67
# pi/4 rad (45°): DOWN-RIGHT -> Frame 87
# pi/2 rad (90°): DOWN -> Frame 108
# 3pi/4 rad (135°): DOWN-LEFT -> Frame 135
# pi rad (180°): LEFT -> Frame 165
# 5pi/4 rad (225°): UP-LEFT -> Frame 186 / 0
# 3pi/2 rad (270°): UP -> Frame 20
# 7pi/4 rad (315°): UP-RIGHT -> Frame 39
# CENTER: Frame 226

compass_keyframes = {
    "RIGHT": 67,
    "DOWN-RIGHT": 87,
    "DOWN": 108,
    "DOWN-LEFT": 135,
    "LEFT": 165,
    "UP-LEFT": 186,
    "UP": 20,
    "UP-RIGHT": 39,
    "CENTER": 226
}

print("Identified 8 Compass Keyframes + Center:")
for k, v in compass_keyframes.items():
    print(f"  {k:12s}: Frame {v}")

def get_linear_frames(start, end, count):
    return [int(round(start + (end - start) * (i / count))) for i in range(count)]

# 64 frames along 360° circular head rotation trajectory:
# 8 octants of 8 frames each = 64 frames (~5.625° per frame)
oct0 = get_linear_frames(67, 87, 8)     # RIGHT -> DOWN-RIGHT
oct1 = get_linear_frames(87, 108, 8)    # DOWN-RIGHT -> DOWN
oct2 = get_linear_frames(108, 135, 8)   # DOWN -> DOWN-LEFT
oct3 = get_linear_frames(135, 165, 8)   # DOWN-LEFT -> LEFT
oct4 = get_linear_frames(165, 186, 8)   # LEFT -> UP-LEFT

# Octant 5: Smoothly connect UP-LEFT to UP (skipping eye blink between frames 6-10)
oct5_seq = [186, 0, 1, 2, 3, 4, 13, 15, 17, 19]
oct5 = [oct5_seq[int(round(i * (len(oct5_seq) - 1) / 8))] for i in range(8)]

oct6 = get_linear_frames(20, 39, 8)     # UP -> UP-RIGHT
oct7 = get_linear_frames(39, 67, 8)     # UP-RIGHT -> RIGHT

trajectory_indices = oct0 + oct1 + oct2 + oct3 + oct4 + oct5 + oct6 + oct7
assert len(trajectory_indices) == 64, f"Expected 64 frames, got {len(trajectory_indices)}"

print(f"Extracting 64 high-quality WebP frames (Q=90)...")
frame_metadata = []

for i, f_id in enumerate(trajectory_indices):
    frame = all_frames[f_id]
    out_name = f"frame_{i:02d}.webp"
    out_path = os.path.join("public/frames", out_name)
    
    # Save as WebP with quality 90 for pristine fidelity
    cv2.imwrite(out_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 90])
    
    angle_deg = i * 5.625
    frame_metadata.append({
        "index": i,
        "filename": out_name,
        "videoFrame": f_id,
        "angleDeg": angle_deg,
        "angleRad": angle_deg * np.pi / 180.0
    })

# Save center frame
center_frame = all_frames[226]
center_path_frames = os.path.join("public/frames", "center.webp")
center_path_public = os.path.join("public", "center.webp")

cv2.imwrite(center_path_frames, center_frame, [cv2.IMWRITE_WEBP_QUALITY, 92])
cv2.imwrite(center_path_public, center_frame, [cv2.IMWRITE_WEBP_QUALITY, 92])
print("Saved center.webp")

# Save manifest json for frontend
manifest = {
    "totalFrames": 64,
    "angleStepDeg": 5.625,
    "backgroundColorHex": bg_hex,
    "backgroundColorRgb": bg_rgb,
    "faceCenterNorm": {"x": 0.481, "y": 0.333},
    "compassKeyframes": compass_keyframes,
    "frames": frame_metadata
}

with open("public/frames/manifest.json", "w") as f:
    json.dump(manifest, f, indent=2)

print("Frame extraction complete! Manifest written to public/frames/manifest.json")
