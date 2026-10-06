import cv2
import numpy as np

cap = cv2.VideoCapture("public/character.mp4")

frames = {}
target_indices = [185, 188, 191, 194, 197, 200, 0, 2, 4, 8, 12, 16, 20, 24]
idx = 0
while True:
    ret, frame = cap.read()
    if not ret:
        break
    if idx in target_indices:
        frames[idx] = frame
    idx += 1
cap.release()

sheet = np.zeros((2 * 90, 7 * 160, 3), dtype=np.uint8)
for i, f_id in enumerate(target_indices):
    if f_id in frames:
        small = cv2.resize(frames[f_id], (160, 90))
        cv2.putText(small, f"F:{f_id}", (5, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        r = i // 7
        c = i % 7
        sheet[r*90:(r+1)*90, c*160:(c+1)*160] = small

cv2.imwrite("loop_transition.jpg", sheet)
print("Saved loop_transition.jpg")
