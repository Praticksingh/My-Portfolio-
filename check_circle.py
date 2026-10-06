import cv2
import numpy as np

cap = cv2.VideoCapture("public/character.mp4")

# Let's inspect frames from 20 to 200 with step 3
indices = list(range(20, 205, 3))
cols = 8
rows = (len(indices) + cols - 1) // cols
sheet = np.zeros((rows * 90, cols * 160, 3), dtype=np.uint8)

for idx, f in enumerate(indices):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f)
    ret, frame = cap.read()
    if ret:
        small = cv2.resize(frame, (160, 90))
        cv2.putText(small, f"F:{f}", (5, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        r = idx // cols
        c = idx % cols
        sheet[r*90:(r+1)*90, c*160:(c+1)*160] = small

cv2.imwrite("circle_frames.jpg", sheet)
cap.release()
print(f"Saved circle_frames.jpg with {len(indices)} frames")
