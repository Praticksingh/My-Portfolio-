import cv2
import os

cap = cv2.VideoCapture("public/character.mp4")
cap.set(cv2.CAP_PROP_POS_FRAMES, 226)
ret, frame = cap.read()
cap.release()

os.makedirs("test_webp", exist_ok=True)
# Save as WebP with quality 90
cv2.imwrite("test_webp/center_q90.webp", frame, [cv2.IMWRITE_WEBP_QUALITY, 90])
cv2.imwrite("test_webp/center_q85.webp", frame, [cv2.IMWRITE_WEBP_QUALITY, 85])

print("Q90 size:", os.path.getsize("test_webp/center_q90.webp") / 1024, "KB")
print("Q85 size:", os.path.getsize("test_webp/center_q85.webp") / 1024, "KB")
