import cv2
import os

cap = cv2.VideoCapture("public/character.mp4")
cap.set(cv2.CAP_PROP_POS_FRAMES, 226)
ret, frame = cap.read()
cap.release()

# Resize to 1280x720
resized = cv2.resize(frame, (1280, 720), interpolation=cv2.INTER_AREA)

os.makedirs("test_opt", exist_ok=True)
cv2.imwrite("test_opt/frame_1280_q88.webp", resized, [cv2.IMWRITE_WEBP_QUALITY, 88])
cv2.imwrite("test_opt/frame_1280_q85.webp", resized, [cv2.IMWRITE_WEBP_QUALITY, 85])

size_88 = os.path.getsize("test_opt/frame_1280_q88.webp") / 1024
size_85 = os.path.getsize("test_opt/frame_1280_q85.webp") / 1024

print(f"1280x720 Q88 Size: {size_88:.2f} KB")
print(f"1280x720 Q85 Size: {size_85:.2f} KB")
print(f"Estimated 96 frames total payload at Q88: {size_88 * 96 / 1024:.2f} MB")
