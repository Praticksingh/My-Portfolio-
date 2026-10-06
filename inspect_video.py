import cv2
import numpy as np
import os

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

print(f"Video Info:")
print(f"  Frames: {total_frames}")
print(f"  FPS: {fps}")
print(f"  Resolution: {width}x{height}")
print(f"  Duration: {duration:.2f}s")

# Sample corners across frames to find the exact background color
bg_samples = []
for f_idx in range(0, total_frames, max(1, total_frames // 10)):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
    ret, frame = cap.read()
    if ret:
        # Sample 4 corners: top-left, top-right, bottom-left, bottom-right
        corners = [
            frame[5:25, 5:25],
            frame[5:25, width-25:width-5],
            frame[height-25:height-5, 5:25],
            frame[height-25:height-5, width-25:width-5]
        ]
        for c in corners:
            bg_samples.append(np.median(c, axis=(0,1)))

bg_bgr = np.median(bg_samples, axis=0)
bg_rgb = [int(bg_bgr[2]), int(bg_bgr[1]), int(bg_bgr[0])]
bg_hex = f"#{bg_rgb[0]:02X}{bg_rgb[1]:02X}{bg_rgb[2]:02X}"
print(f"Detected Background Color: RGB={bg_rgb}, HEX={bg_hex}")

cap.release()
