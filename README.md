# AfterTone Hospitality Lab

README（草稿 / 待正式版）

AfterTone Hospitality Lab 是一個以「靜感沉浸式體驗旅宿顧問」為核心概念的品牌網站原型，用來呈現品牌定位、服務流程、案例提案與合作方式。

目前此專案已可部署並上線，但內容上仍屬於「提案展示版 / 待定稿版本」：
- 已完成前端頁面與自動部署流程
- 已上線至 Vercel
- 仍有多處文案標記為 `✎ 待定稿`，正式對外前建議再逐段校稿

## 線上網址

- Production: https://aftertone-hospitality-lab.vercel.app
- GitHub Repo: https://github.com/Samura87/aftertone-hospitality-lab

## 專案重點

- 品牌定位頁面：呈現 AfterTone 的體驗哲學與市場切入角度
- 顧問服務流程：整理市場調研、產品診斷、策略制定、系統建置、啟動執行、監測優化
- 案例展示：目前已包含海境案例頁
- 自動部署：`main` 分支 push 後會自動部署到 Vercel Production

## 技術堆疊

- Next.js 16.2.6（App Router）
- React 19
- TypeScript
- Tailwind CSS 4
- pnpm
- GitHub Actions
- Vercel

## 目前站點結構

- `/`：首頁
- `/cases/haijing/`：海境案例頁

## 專案結構

```text
site/
├─ src/
│  ├─ app/
│  │  ├─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ cases/haijing/page.tsx
│  ├─ components/
│  └─ lib/
│     ├─ content.ts
│     └─ haijing-case-data.ts
├─ public/
│  └─ images/
├─ .github/workflows/
│  └─ vercel-production-deploy.yml
├─ AGENTS.md
├─ README.md
├─ next.config.ts
└─ vercel.json
```

## 內容編輯入口

### 1. 品牌與首頁主要內容
優先查看：
- `src/lib/content.ts`

這裡集中管理：
- 品牌名稱 / tagline
- hero 文字
- 導覽列
- 服務流程
- 模組介紹
- ESG 區塊
- 指標數據
- 費用方案
- 團隊資訊
- 案例摘要

### 2. 海境案例詳細內容
優先查看：
- `src/lib/haijing-case-data.ts`
- `src/lib/content.ts` 中的 `haijingCase`

### 3. 特定區塊的版面與局部文案
當內容不是由 `content.ts` 驅動時，請查看：
- `src/components/Hero.tsx`
- `src/components/Sections.tsx`
- `src/components/Sections2.tsx`
- `src/components/CasesPreview.tsx`
- `src/components/HaijingCase.tsx`

注意：有些首頁文案會同時存在於資料檔與元件內，修改時要同步檢查，避免前後不一致。

## 圖片資產慣例

- Hero 圖片：`public/images/hero/`
- 案例圖片：`public/images/cases/`

若圖片尚未補齊，專案目前允許以漸層或佔位方式維持版面完整。

## 開發指令

安裝依賴：

```bash
pnpm install
```

本地開發：

```bash
pnpm dev
```

正式建置：

```bash
pnpm build
```

## 部署方式

本專案目前使用：
- GitHub 管理版本
- GitHub Actions 自動觸發部署
- Vercel 作為 Production Hosting

當你執行：

```bash
git push origin main
```

GitHub Actions 會自動執行：
1. checkout repository
2. setup pnpm / node
3. install Vercel CLI
4. pull production environment
5. build project artifacts
6. deploy 到 Vercel Production

Workflow 檔案位置：
- `.github/workflows/vercel-production-deploy.yml`

## 部署設定說明

### Next.js
目前站點採用 static export：
- `output: "export"`
- `trailingSlash: true`

設定檔：
- `next.config.ts`

### Vercel
Vercel 直接讀取 `out/` 作為輸出：
- `vercel.json`

## 正式版前建議補完項目

### 文案
- 清除所有 `✎ 待定稿` 標記
- 逐段確認提案文字是否能正式對外
- 再校正品牌語氣是否完全一致

### 視覺
- 補齊 Hero 正式圖片
- 補齊案例圖與圖說
- 檢查不同裝置上的字級、留白與圖片裁切

### 品牌資訊
- 確認聯絡方式是否為正式對外版本
- 確認團隊名單是否完整
- 確認案例頁標語與摘要是否可公開

## AI Agent / 協作提示

如果未來有 AI agent 或新協作者接手，請先閱讀：
- `AGENTS.md`
- `docs/agents/project-rules.md`

這兩份文件記錄了：
- 專案工作習慣
- 設計與文案原則
- 技術限制
- 驗證與部署規則

## 備註

此 README 目前是「待正式版設計稿」，目的是：
- 讓後續協作者快速理解專案
- 為正式交接文件先建立骨架
- 避免未來內容與部署流程失憶

正式版 README 可再視需要補上：
- 品牌故事
- 視覺系統說明
- 更完整的頁面截圖
- 編輯流程 SOP
- 發版紀錄 / changelog
