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

print(f"Loaded {len(all_frames)} frames.")

# Define the waypoint segments
# Octant 0: RIGHT (67) -> DOWN-RIGHT (87)
# Octant 1: DOWN-RIGHT (87) -> DOWN (108)
# Octant 2: DOWN (108) -> DOWN-LEFT (135)
# Octant 3: DOWN-LEFT (135) -> LEFT (165)
# Octant 4: LEFT (165) -> UP-LEFT (186)
# Octant 5: UP-LEFT (186 -> 0 -> 4 -> 14) -> UP (20)
# Octant 6: UP (20) -> UP-RIGHT (39)
# Octant 7: UP-RIGHT (39) -> RIGHT (67)

def get_linear_frames(start, end, count):
    # return `count` frame indices from start up to (not including) end
    return [int(round(start + (end - start) * (i / count))) for i in range(count)]

oct0 = get_linear_frames(67, 87, 8)
oct1 = get_linear_frames(87, 108, 8)
oct2 = get_linear_frames(108, 135, 8)
oct3 = get_linear_frames(135, 165, 8)
oct4 = get_linear_frames(165, 186, 8)

# For Octant 5: from 186 to UP (20) through 0..4 and 12..20
# Let's map 8 points across the list [186, 0, 1, 2, 3, 4, 13, 15, 17, 19, 20]
oct5_seq = [186, 0, 1, 2, 3, 4, 13, 15, 17, 19]
oct5 = [oct5_seq[int(round(i * (len(oct5_seq) - 1) / 8))] for i in range(8)]

oct6 = get_linear_frames(20, 39, 8)
oct7 = get_linear_frames(39, 67, 8)

selected_64 = oct0 + oct1 + oct2 + oct3 + oct4 + oct5 + oct6 + oct7
print(f"Selected {len(selected_64)} frames:")
print(selected_64)

# Create an 8x8 contact sheet to inspect all 64 frames
sheet = np.zeros((8 * 90, 8 * 160, 3), dtype=np.uint8)
for i, f_id in enumerate(selected_64):
    f = all_frames[f_id].copy()
    cv2.putText(f, f"i:{i} (F:{f_id})", (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 2)
    small = cv2.resize(f, (160, 90))
    r = i // 8
    c = i % 8
    sheet[r*90:(r+1)*90, c*160:(c+1)*160] = small

cv2.imwrite("test_64_frames.jpg", sheet)
print("Saved test_64_frames.jpg")
