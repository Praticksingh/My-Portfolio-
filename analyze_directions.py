import cv2

cap = cv2.VideoCapture("public/character.mp4")
all_frames = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    all_frames.append(frame)
cap.release()

print(f"Loaded {len(all_frames)} frames.")

# Let's check frames around each key segment
# Let's save a detailed comparison of:
# UP: 16..22
# UP-RIGHT: 36..42
# RIGHT: 64..70
# DOWN-RIGHT: 86..92
# DOWN: 106..112
# DOWN-LEFT: 132..138
# LEFT: 162..168
# UP-LEFT: 186..194 and 0..6
def save_strip(frame_indices, out_name):
    strip = []
    for idx in frame_indices:
        f = all_frames[idx].copy()
        cv2.putText(f, f"F:{idx}", (30, 80), cv2.FONT_HERSHEY_SIMPLEX, 2.0, (255, 255, 255), 4)
        strip.append(cv2.resize(f, (240, 135)))
    cv2.imwrite(out_name, cv2.hconcat(strip))

save_strip([16, 18, 20, 22], "strip_UP.jpg")
save_strip([36, 38, 40, 42], "strip_UP_RIGHT.jpg")
save_strip([64, 66, 68, 70], "strip_RIGHT.jpg")
save_strip([84, 86, 88, 90], "strip_DOWN_RIGHT.jpg")
save_strip([106, 108, 110, 112], "strip_DOWN.jpg")
save_strip([132, 134, 136, 138], "strip_DOWN_LEFT.jpg")
save_strip([162, 164, 166, 168], "strip_LEFT.jpg")
save_strip([186, 188, 190, 192], "strip_UP_LEFT_a.jpg")
save_strip([0, 2, 4, 14], "strip_UP_LEFT_b.jpg")
save_strip([218, 222, 226, 230], "strip_CENTER.jpg")

print("Saved all comparison strips.")
