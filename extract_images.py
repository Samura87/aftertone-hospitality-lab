import fitz
import os

pdf_path = r"C:\Users\Samura\OneDrive\桌面\AfterTone\Docs\海境_AfterTone_完整提案_可編輯版 的副本.pdf"
out_dir = r"C:\Users\Samura\OneDrive\桌面\AfterTone\site\public\images\cases"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

pages_to_extract = {
    15: "google-trends-5yr",
    16: "google-trends-yoy",
    17: "demand-forecast-regions",
    18: "demand-forecast-comparison",
    21: "customer-reviews",
    22: "booking-listings",
    23: "price-competition-daily",
    24: "price-competition-range",
    25: "price-competition-rooms",
}

for page_num, name in pages_to_extract.items():
    page = doc[page_num - 1]
    mat = fitz.Matrix(200/72, 200/72)
    pix = page.get_pixmap(matrix=mat)
    output_path = os.path.join(out_dir, f"{name}.png")
    pix.save(output_path)
    print(f"Saved: {name}.png ({pix.width}x{pix.height})")

doc.close()
print("Done!")
