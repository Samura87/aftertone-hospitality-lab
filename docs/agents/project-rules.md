# AfterTone Hospitality Lab — Project Rules for AI Agents

這份文件是給未來接手此專案的 AI agent / 協作者的專案內部規則。

目標只有一個：
在開始修改之前，先理解這個專案的品牌方向、技術限制、工作習慣與驗證標準，避免每次都重新踩雷。

## 1. 專案定位

AfterTone Hospitality Lab 不是一般「熱鬧型」旅宿網站，而是偏向：
- 靜感
- 沉浸
- 內斂
- 精緻
- 帶有 editorial / 提案感 的品牌展示站

核心氣質應接近：
- calm
- refined
- immersive
- quietly premium

不應走向：
- 過度促銷
- 過度喧鬧
- 廣告感太強
- 炫技型互動特效堆疊

## 2. 與專案擁有者合作時的工作習慣

### 溝通習慣
- 以繁體中文回應為主。
- 過程要透明，盡量讓對方知道你做了哪些步驟。
- 即使遇到問題，也要明確說明失敗點與原因，不要假裝成功。
- 若你說「已完成」，請先有實際驗證依據。

### 工作風格
- 優先直接動手查、改、驗證，不要只停留在口頭建議。
- 修改後要說清楚：改了哪幾個檔案、為什麼改。
- 若牽涉文案、元件、資料檔多處同步，務必全部檢查一致性。

## 3. 設計與品牌守則

### 視覺方向
偏好：
- 乾淨
- 清楚
- 留白足夠
- 資訊階層分明
- 視覺節奏平穩

避免：
- 過多裝飾性物件
- 為了氛圍而加太多場景道具
- 過度復古舞台化的裝飾
- 訊息被特效搶走

### 已知偏好
- 不要主動加入復古信封、房間、窗邊等額外氛圍特效，除非專案擁有者明確要求。
- 可依內容調整配色，但整體要維持乾淨、精緻、好閱讀。
- 首頁主標目前偏好移除外圍標點，讓視覺更乾淨。

### 文案語氣
應偏向：
- 內斂
- 精準
- 有餘韻
- 少一點口號式叫賣

避免：
- 太像廣告 banner
- 太浮誇
- 太滿太吵
- 缺乏品牌留白

## 4. 內容與資料規則

### Canonical content file
主要內容資料以這些檔案為核心：
- `src/lib/content.ts`
- `src/lib/haijing-case-data.ts`

先看這兩個檔案，再動元件。

### `✎ 待定稿` 規則
若內容帶有：
- `✎ 待定稿`

表示這段文案尚未被正式定稿。

規則：
- 不要自行把它當成最終正式文案
- 不要在沒有說明的情況下移除標記
- 如果要協助修文，可以提出版本，但要清楚標示你改的是草案或建議稿

### 數字 / 事實敘述規則
任何涉及：
- 數據
- 市場判斷
- 漲跌幅
- 案例成效
- 顧問成果

都要能對回：
- proposal deck 內容
- 專案中既有可驗證資料
- 或明確外部來源

不能為了讓文案更有氣勢就自行擴寫成未驗證結論。

## 5. 常用檔案地圖

### 站點入口
- `src/app/page.tsx`：首頁
- `src/app/layout.tsx`：全站 metadata / layout
- `src/app/cases/haijing/page.tsx`：海境案例頁

### 主要元件
- `src/components/Hero.tsx`
- `src/components/Sections.tsx`
- `src/components/Sections2.tsx`
- `src/components/CasesPreview.tsx`
- `src/components/HaijingCase.tsx`
- `src/components/Navbar.tsx`

### 資料層
- `src/lib/content.ts`
- `src/lib/haijing-case-data.ts`

### 部署與規則
- `AGENTS.md`
- `.github/workflows/vercel-production-deploy.yml`
- `next.config.ts`
- `vercel.json`

## 6. 技術限制與開發規則

### Next.js 規則
此專案使用：
- Next.js 16
- App Router
- static export

所以：
- 不要預設它和舊版 Next.js 完全一樣
- 改 Next.js 行為前，先讀 `node_modules/next/dist/docs/` 裡相關文件
- 不要隨便引入需要 server runtime 才成立的功能，除非專案擁有者明確要求改部署模式

### 目前部署前提
目前站點依賴以下設定成立：
- `next.config.ts`
  - `output: "export"`
  - `trailingSlash: true`
- `vercel.json`
  - `outputDirectory: "out"`

未經評估，不要任意改回 SSR / dynamic 模式。

## 7. 驗證標準

在說「完成」之前，至少確認：

### 一般修改
- 相關檔案已更新
- 變更內容前後一致
- 沒有留下明顯衝突文案

### 影響版面 / 程式的修改
必做：

```bash
pnpm build
```

如果 build 沒過，不要宣稱完成。

### 影響部署的修改
知道這條鏈路：
- `git push origin main`
- GitHub Actions 自動跑 workflow
- Vercel 自動更新 production

workflow 檔案：
- `.github/workflows/vercel-production-deploy.yml`

## 8. 自動部署規則

目前已打通：
- GitHub repo 更新
- push 到 `main`
- GitHub Actions 自動部署到 Vercel

因此：
- 如果只是一般內容或版面更新，優先沿用這套流程
- 不要另外發明第二套部署方式，除非有明確需求

## 9. 圖片與素材慣例

- Hero 圖片放在：`public/images/hero/`
- 案例圖片放在：`public/images/cases/`

若正式素材尚未齊備，可先維持：
- 漸層底
- placeholder
- 說明性 alt

但不要用與品牌氣質不一致的臨時圖硬塞版面。

## 10. Definition of Done

只有在以下都成立時，才比較接近「真的完成」：
- 需求本身有被實作
- 受影響的文案 / 元件 / 資料檔一致
- `pnpm build` 通過
- 若有部署，已確認自動部署成功
- 回報時清楚指出改了哪些檔案、怎麼驗證

## 11. 建議的工作順序

對未來 agent，建議順序如下：

1. 先讀 `README.md`
2. 再讀 `AGENTS.md`
3. 再讀本檔 `docs/agents/project-rules.md`
4. 再找本次任務對應的資料檔 / 元件
5. 修改後先 build 驗證
6. 最後再回報

如果任務涉及 Next.js 行為、部署、或框架限制：
7. 先查 `node_modules/next/dist/docs/` 再動手

## 12. 目前專案仍屬草稿區

這個專案現在已可上線，但內容層面仍不是最終正式版。

特別注意：
- 有些案例文字仍是提案整理稿
- 有些句子仍標示 `✎ 待定稿`
- README 目前也是「待正式版」文件骨架

因此，後續 agent 的任務通常不是「亂補滿」，而是：
- 保持乾淨
- 保持一致
- 在正式定稿前避免過度自作主張
