import cv2
import numpy as np

img = cv2.imread("test_webp/center_q90.webp")
h, w = img.shape[:2]

# The background is red: High R (around 234), Low G and B (< 20)
# Pixels that differ from background are the person
bg_color = np.array([7, 14, 234], dtype=np.float32) # BGR
diff = np.linalg.norm(img.astype(np.float32) - bg_color, axis=2)

mask = diff > 40
person_y, person_x = np.where(mask)

min_x, max_x = person_x.min(), person_x.max()
min_y, max_y = person_y.min(), person_y.max()

# The top of the person is the hair/head
top_head_y = min_y
center_x = (min_x + max_x) // 2
# Head center is usually around min_y + 250..350
print(f"Person bounds: x=[{min_x}, {max_x}] (center={center_x}, {center_x/w:.3f}), y=[{min_y}, {max_y}]")
print(f"Top of head y: {top_head_y} ({top_head_y/h:.3f})")

# Let's inspect the head region around y = [top_head_y, top_head_y + 400], x = [center_x - 200, center_x + 200]
face_center_x = center_x
face_center_y = top_head_y + int((max_y - top_head_y) * 0.3)
print(f"Estimated face center: x={face_center_x} ({face_center_x/w:.3f}), y={face_center_y} ({face_center_y/h:.3f})")
