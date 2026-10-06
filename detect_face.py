import cv2

img = cv2.imread("test_webp/center_q90.webp")
h, w = img.shape[:2]

# Load frontal face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, 1.1, 4)

for (x, y, fw, fh) in faces:
    print(f"Face box: x={x}, y={y}, w={fw}, h={fh}")
    print(f"Face center: x={x + fw//2} ({ (x + fw/2)/w:.3f} of width), y={y + fh//2} ({ (y + fh/2)/h:.3f} of height)")

    # Draw on copy and save
    cv2.rectangle(img, (x, y), (x+fw, y+fh), (0, 255, 0), 3)
    cv2.circle(img, (x + fw//2, y + fh//2), 10, (0, 0, 255), -1)

cv2.imwrite("face_detected.jpg", img)
print("Saved face_detected.jpg")
