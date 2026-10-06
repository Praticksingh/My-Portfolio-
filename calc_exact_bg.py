import cv2
import numpy as np
import glob

files = glob.glob("public/frames/frame_*.webp")
samples = []
for f in files:
    img = cv2.imread(f)
    samples.append(img[10, 10])
    samples.append(img[10, -10])
    samples.append(img[-10, 10])
    samples.append(img[-10, -10])

mean_bgr = np.mean(samples, axis=0)
median_bgr = np.median(samples, axis=0)

mean_rgb = [int(round(mean_bgr[2])), int(round(mean_bgr[1])), int(round(mean_bgr[0]))]
median_rgb = [int(round(median_bgr[2])), int(round(median_bgr[1])), int(round(median_bgr[0]))]

print(f"Mean RGB: {mean_rgb}, HEX: #{mean_rgb[0]:02X}{mean_rgb[1]:02X}{mean_rgb[2]:02X}")
print(f"Median RGB: {median_rgb}, HEX: #{median_rgb[0]:02X}{median_rgb[1]:02X}{median_rgb[2]:02X}")
