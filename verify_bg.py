import cv2
import numpy as np

img = cv2.imread("test_webp/center_q90.webp")
# Check corners
corners = [
    img[10, 10],
    img[10, -10],
    img[-10, 10],
    img[-10, -10],
    img[50, 50],
    img[50, -50]
]
for i, c in enumerate(corners):
    # c is BGR
    print(f"Corner {i}: RGB=({c[2]}, {c[1]}, {c[0]}), HEX=#{c[2]:02X}{c[1]:02X}{c[0]:02X}")
