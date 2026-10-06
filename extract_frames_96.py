import cv2
import numpy as np
import os
import json

os.makedirs("public/frames", exist_ok=True)

video_path = "public/character.mp4"
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error opening {video_path}")
    exit(1)

total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print(f"Total video frames: {total_frames}")

# Load all frames sequentially into memory
all_frames = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    # Resize to optimized 1280x720 using INTER_AREA for maximum crispness
    small = cv2.resize(frame, (1280, 720), interpolation=cv2.INTER_AREA)
    all_frames.append(small)
cap.release()

print(f"Loaded {len(all_frames)} frames resized to 1280x720.")

# Target background color: RGB(235, 16, 8) -> BGR(8, 16, 235)
target_bgr = np.array([8, 16, 235], dtype=np.float32)

def clean_backdrop(img):
    # Ensure solid flat background matches #eb1008 perfectly without compression variance
    diff = np.linalg.norm(img.astype(np.float32) - target_bgr, axis=2)
    # Mask where pixel is very close to red background
    bg_mask = diff < 28
    out = img.copy()
    out[bg_mask] = [8, 16, 235]
    return out

def get_linear_frames(start, end, count):
    return [int(round(start + (end - start) * (i / count))) for i in range(count)]

# 96 frames across 8 octants = 12 frames per octant (3.75° per frame)
# Keyframe waypoints:
# RIGHT: 67
# DOWN-RIGHT: 87
# DOWN: 108
# DOWN-LEFT: 135
# LEFT: 165
# UP-LEFT: 186
# UP: 20
# UP-RIGHT: 39

oct0 = get_linear_frames(67, 87, 12)    # RIGHT -> DOWN-RIGHT
oct1 = get_linear_frames(87, 108, 12)   # DOWN-RIGHT -> DOWN
oct2 = get_linear_frames(108, 135, 12)  # DOWN -> DOWN-LEFT
oct3 = get_linear_frames(135, 165, 12)  # DOWN-LEFT -> LEFT
oct4 = get_linear_frames(165, 186, 12)  # LEFT -> UP-LEFT

# Octant 5: Smoothly connect UP-LEFT to UP (skipping eye blink between frames 6-10)
# Sequence of open-eyed frames from UP-LEFT to UP:
oct5_seq = [186, 187, 0, 1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19, 20]
oct5 = [oct5_seq[int(round(i * (len(oct5_seq) - 1) / 12))] for i in range(12)]

oct6 = get_linear_frames(20, 39, 12)    # UP -> UP-RIGHT
oct7 = get_linear_frames(39, 67, 12)    # UP-RIGHT -> RIGHT

trajectory_indices = oct0 + oct1 + oct2 + oct3 + oct4 + oct5 + oct6 + oct7
assert len(trajectory_indices) == 96, f"Expected 96 frames, got {len(trajectory_indices)}"

print(f"Exporting 96 high-quality WebP frames (1280x720, Q=88)...")
manifest = []

for i, f_id in enumerate(trajectory_indices):
    frame = clean_backdrop(all_frames[f_id])
    filename = f"frame-{i:03d}.webp"
    filepath = os.path.join("public/frames", filename)
    
    cv2.imwrite(filepath, frame, [cv2.IMWRITE_WEBP_QUALITY, 88])
    
    # Also write legacy frame_xx.webp for backward compatibility if needed
    legacy_filename = f"frame_{i:02d}.webp"
    legacy_filepath = os.path.join("public/frames", legacy_filename)
    cv2.imwrite(legacy_filepath, frame, [cv2.IMWRITE_WEBP_QUALITY, 88])
    
    angle_deg = i * 3.75
    manifest.append({
        "index": i,
        "filename": filename,
        "videoFrame": f_id,
        "angleDeg": round(angle_deg, 2),
        "angleRad": angle_deg * np.pi / 180.0
    })

# Save center neutral frame (frame 226)
center_frame = clean_backdrop(all_frames[226])
cv2.imwrite("public/frames/center.webp", center_frame, [cv2.IMWRITE_WEBP_QUALITY, 90])
cv2.imwrite("public/center.webp", center_frame, [cv2.IMWRITE_WEBP_QUALITY, 90])
print("Saved center.webp")

manifest_data = {
    "totalFrames": 96,
    "angleStepDeg": 3.75,
    "resolution": {"width": 1280, "height": 720},
    "backgroundColorHex": "#EB1008",
    "backgroundColorRgb": [235, 16, 8],
    "faceCenterNorm": {"x": 0.481, "y": 0.333},
    "frames": manifest
}

with open("public/frames/manifest.json", "w") as f:
    json.dump(manifest_data, f, indent=2)

print("Successfully exported 96 frames and manifest.json!")
