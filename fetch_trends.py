from pytrends.request import TrendReq
import json, time

pytrends = TrendReq(hl='zh-TW', tz=480, timeout=(10,30), retries=2, backoff_factor=0.5)

# ── 五年區間 2021-05-29 ~ 2026-05-29 ──
# 比較：墾丁 vs 阿里山 vs 日月潭
kw1 = ['墾丁', '阿里山', '日月潭']
pytrends.build_payload(kw1, timeframe='2021-05-29 2026-05-29', geo='TW')
df1 = pytrends.interest_over_time()
print("=== 墾丁/阿里山/日月潭 五年搜尋熱度 (每週) ===")
if not df1.empty:
    monthly = df1.resample('ME').mean().round(1)
    print(monthly[kw1].to_string())
else:
    print("No data")

time.sleep(3)

# ── 墾丁 + 恆春 YOY ──
kw2 = ['墾丁', '恆春']
pytrends.build_payload(kw2, timeframe='2021-05-29 2026-05-29', geo='TW')
df2 = pytrends.interest_over_time()
print("\n=== 墾丁/恆春 五年 YOY ===")
if not df2.empty:
    monthly2 = df2.resample('ME').mean().round(1)
    print(monthly2[kw2].to_string())
else:
    print("No data")
