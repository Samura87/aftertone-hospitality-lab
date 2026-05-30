from PIL import Image
import os

out_dir = r"C:\Users\Samura\OneDrive\桌面\AfterTone\site\public\images\cases"

# Crop settings (left, upper, right, lower) for 2000x1125 images
# These remove the title area and focus on the visual content
crops = {
    # p15: Google Trends 5yr - chart is in center/bottom area
    "google-trends-5yr.png": (50, 300, 1950, 1050),
    # p16: Google Trends YOY - chart area
    "google-trends-yoy.png": (50, 300, 1950, 1050),
    # p17: Demand forecast regions - line chart + data table
    "demand-forecast-regions.png": (50, 200, 1950, 1050),
    # p18: Demand forecast comparison
    "demand-forecast-comparison.png": (50, 200, 1950, 1050),
    # p21: Customer reviews - review screenshots
    "customer-reviews.png": (50, 200, 1950, 1100),
    # p22: Booking listings - OTA screenshots (most important!)
    "booking-listings.png": (50, 200, 1950, 1100),
    # p23: Price competition daily chart
    "price-competition-daily.png": (50, 200, 1950, 1050),
    # p24: Price range chart
    "price-competition-range.png": (50, 200, 1950, 1050),
    # p25: Price rooms chart
    "price-competition-rooms.png": (50, 200, 1950, 1050),
}

for filename, box in crops.items():
    path = os.path.join(out_dir, filename)
    img = Image.open(path)
    cropped = img.crop(box)
    # Save as cropped version
    crop_name = filename.replace(".png", "-crop.png")
    crop_path = os.path.join(out_dir, crop_name)
    cropped.save(crop_path, optimize=True)
    print(f"{crop_name}: {cropped.size[0]}x{cropped.size[1]}")

print("Done cropping!")
