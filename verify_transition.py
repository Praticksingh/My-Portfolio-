import cv2
import numpy as np

cap = cv2.VideoCapture("public/character.mp4")
all_frames = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    all_frames.append(frame)
cap.release()

indices = [164, 170, 176, 180, 184, 186, 0, 1, 2, 3, 4, 12, 14, 16, 18, 20]
strip = []
for idx in indices:
    f = all_frames[idx].copy()
    cv2.putText(f, f"F:{idx}", (20, 60), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 3)
    strip.append(cv2.resize(f, (200, 112)))

# Save in 2 rows of 8
r1 = cv2.hconcat(strip[:8])
r2 = cv2.hconcat(strip[8:])
grid = cv2.vconcat([r1, r2])
cv2.imwrite("check_transition_upleft.jpg", grid)
print("Saved check_transition_upleft.jpg")
