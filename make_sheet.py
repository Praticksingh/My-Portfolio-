import cv2
import numpy as np
import glob

# Create a contact sheet of all extracted frames
files = sorted(glob.glob("debug_frames/frame_*.jpg"))
cols = 8
rows = (len(files) + cols - 1) // cols

frame_h, frame_w = 90, 160
sheet = np.zeros((rows * frame_h, cols * frame_w, 3), dtype=np.uint8)

for idx, f in enumerate(files):
    img = cv2.imread(f)
    img_resized = cv2.resize(img, (frame_w, frame_h))
    r = idx // cols
    c = idx % cols
    sheet[r*frame_h:(r+1)*frame_h, c*frame_w:(c+1)*frame_w] = img_resized

cv2.imwrite("contact_sheet.jpg", sheet)
print(f"Contact sheet saved to contact_sheet.jpg with {len(files)} frames ({cols}x{rows})")
