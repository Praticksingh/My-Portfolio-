import cv2
import numpy as np

cap = cv2.VideoCapture("public/character.mp4")

# Let's extract frames 0 to 20 one by one to see how it starts
sheet = np.zeros((4 * 90, 6 * 160, 3), dtype=np.uint8)
for i in range(24):
    cap.set(cv2.CAP_PROP_POS_FRAMES, i)
    ret, frame = cap.read()
    if ret:
        small = cv2.resize(frame, (160, 90))
        cv2.putText(small, f"F:{i}", (5, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        r = i // 6
        c = i % 6
        sheet[r*90:(r+1)*90, c*160:(c+1)*160] = small

cv2.imwrite("first_24_frames.jpg", sheet)
cap.release()
print("Saved first_24_frames.jpg")
