import cv2
import numpy as np
import os

video_path = "public/character.mp4"
cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

os.makedirs("debug_frames", exist_ok=True)

# Save every 5th frame as small jpeg to inspect timeline
for f_idx in range(0, total_frames, 4):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
    ret, frame = cap.read()
    if ret:
        small = cv2.resize(frame, (320, 180))
        # Draw frame number
        cv2.putText(small, f"F:{f_idx}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
        cv2.imwrite(f"debug_frames/frame_{f_idx:03d}.jpg", small)

# Also check the last 20 frames specifically
for f_idx in range(max(0, total_frames - 20), total_frames):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
    ret, frame = cap.read()
    if ret:
        small = cv2.resize(frame, (320, 180))
        cv2.putText(small, f"F:{f_idx}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
        cv2.imwrite(f"debug_frames/frame_{f_idx:03d}.jpg", small)

print(f"Exported debug frames to debug_frames/")
cap.release()
