import cv2
import numpy as np

cap = cv2.VideoCapture("public/character.mp4")

# Read sequentially to be super fast
f_idx = 0
sheet = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    if 185 <= f_idx <= 238:
        small = cv2.resize(frame, (160, 90))
        cv2.putText(small, f"F:{f_idx}", (5, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        sheet.append(small)
    f_idx += 1

cap.release()

cols = 8
rows = (len(sheet) + cols - 1) // cols
out = np.zeros((rows * 90, cols * 160, 3), dtype=np.uint8)
for i, img in enumerate(sheet):
    r = i // cols
    c = i % cols
    out[r*90:(r+1)*90, c*160:(c+1)*160] = img

cv2.imwrite("end_frames.jpg", out)
print("Saved end_frames.jpg")
