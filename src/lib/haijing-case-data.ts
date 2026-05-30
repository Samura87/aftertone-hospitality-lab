// 海境案例頁 — 附件一內容 (p11-p35)
// 所有數據直接來自簡報，禁止自行生成

export const haijingPageData = {
  // p11 封面
  cover: {
    eyebrow: "附件一",
    title: "恆春海境合作提案",
    subtitle: "市場及營收",
  },

  // p12 標題頁
  intro: {
    date: "2026 April",
    name: "墾丁海境渡假民宿",
    subtitle: "客製化分析與服務介紹",
  },

  // p13 墾丁市場概況
  marketOverview: {
    title: "墾丁市場概況",
    items: ["住宿需求", "旅遊需求", "房價潛力"],
  },

  // p14 觀光局數據
  tourismData: {
    title: "觀光局數據分享",
    subtitle: "墾丁觀光人潮",
    unit: "單位：人次",
    highlight: "2026年 200萬保衛戰（預估約 190萬～220萬人次）",
    points: [
      "2014 高峰約 837萬人次",
      "2021 疫情低點約 201萬人次",
      "2024 約 214萬人次（歷史低點附近）",
    ],
    chartData: [
      { year: "2014", value: 837, label: "歷史高峰" },
      { year: "2015", value: 808 },
      { year: "2016", value: 583 },
      { year: "2017", value: 439 },
      { year: "2018", value: 356 },
      { year: "2019", value: 262 },
      { year: "2020", value: 262, label: "疫情初期" },
      { year: "2021", value: 201, label: "疫情谷底" },
      { year: "2022", value: 253 },
      { year: "2023", value: 262 },
      { year: "2024", value: 214 },
      { year: "2025", value: 213.9 },
    ],
  },

  // p15-16 Google 搜尋熱度
  googleTrends: {
    title: "GOOGLE關鍵字熱度搜尋",
    // Chart1：五年三區域比較（實際 Google Trends 數據，2021-05-29 ~ 2026-05-29 月均值）
    // 資料來源：Google Trends TW，pytrends 查詢，2026-05-30
    chart1: {
      subtitle: "過去五年與墾丁齊名觀光區域搜尋熱度比較",
      note: "墾丁 2022 年均值 51.0 為近五年高峰，2025 年均值 26.1 已較高峰下滑 -48.7%",
      // 每季代表月（Q1=1月, Q2=4月, Q3=7月, Q4=10月）
      labels: [
        "2021/Q3","2021/Q4",
        "2022/Q1","2022/Q2","2022/Q3","2022/Q4",
        "2023/Q1","2023/Q2","2023/Q3","2023/Q4",
        "2024/Q1","2024/Q2","2024/Q3","2024/Q4",
        "2025/Q1","2025/Q2","2025/Q3","2025/Q4",
        "2026/Q1","2026/Q2",
      ],
      // 峰值標記索引（對應 labels 陣列）：2022/Q3 = index 4
      peakIndex: 4,
      peakLabel: "近十年高峰",
      series: [
        {
          name: "墾丁",
          color: "#5a9e7c",
          // 季均值（取各季3月平均），來源：Google Trends TW 實際查詢
          values: [
            29.5, 46.4,
            46.0, 38.1, 71.7, 39.4,
            40.1, 43.2, 42.3, 26.7,
            28.0, 35.5, 41.0, 18.3,
            23.6, 28.0, 29.7, 20.7,
            21.7, 25.2,
          ],
        },
        {
          name: "阿里山",
          color: "#f0c97c",
          values: [
            8.1, 14.7,
            32.7, 23.5, 35.5, 33.0,
            37.3, 28.0, 23.4, 28.8,
            27.9, 23.1, 28.5, 27.7,
            28.5, 25.4, 25.4, 30.4,
            29.7, 25.2,
          ],
        },
        {
          name: "日月潭",
          color: "#a3c4bc",
          values: [
            13.6, 36.9,
            33.6, 26.8, 37.4, 34.2,
            31.3, 25.7, 28.3, 30.4,
            23.8, 21.7, 24.9, 29.0,
            25.1, 22.3, 27.8, 28.3,
            23.3, 21.0,
          ],
        },
      ],
    },
    // Chart2：墾丁完整時間軸（2021-05 ~ 2026-05，月度，單條折線）
    // 資料來源：Google Trends TW，pytrends 查詢，2026-05-30
    chart2: {
      subtitle: "墾丁搜尋熱度完整走勢（2021.05 ~ 2026.05）",
      note: "2022→2023: -24.2% ／ 2023→2024: -21.3% ／ 2024→2025: -14.2%（連續三年下滑）",
      color: "#5a9e7c",
      // 完整月度資料，label 欄位僅在峰值點出現
      // 峰值：2022/07(92.6) / 2023/06(52.8) / 2024/06(42.0)
      data: [
        // 2021
        { year: "2021/5",  value: 9.5  },
        { year: "2021/6",  value: 9.5  },
        { year: "2021/7",  value: 19.0 },
        { year: "2021/8",  value: 50.4 },
        { year: "2021/9",  value: 54.0 },
        { year: "2021/10", value: 59.8 },
        { year: "2021/11", value: 41.8 },
        { year: "2021/12", value: 37.5 },
        // 2022
        { year: "2022/1",  value: 35.8 },
        { year: "2022/2",  value: 42.2 },
        { year: "2022/3",  value: 60.0 },
        { year: "2022/4",  value: 39.5 },
        { year: "2022/5",  value: 35.4 },
        { year: "2022/6",  value: 77.2 },
        { year: "2022/7",  value: 92.6, label: "92.6 近十年高峰" },
        { year: "2022/8",  value: 73.2 },
        { year: "2022/9",  value: 48.0 },
        { year: "2022/10", value: 42.2 },
        { year: "2022/11", value: 33.8 },
        { year: "2022/12", value: 31.8 },
        // 2023
        { year: "2023/1",  value: 38.8 },
        { year: "2023/2",  value: 41.5 },
        { year: "2023/3",  value: 40.0 },
        { year: "2023/4",  value: 43.4 },
        { year: "2023/5",  value: 42.2 },
        { year: "2023/6",  value: 52.8, label: "52.8" },
        { year: "2023/7",  value: 51.0 },
        { year: "2023/8",  value: 43.5 },
        { year: "2023/9",  value: 30.5 },
        { year: "2023/10", value: 32.8 },
        { year: "2023/11", value: 24.0 },
        { year: "2023/12", value: 23.4 },
        // 2024
        { year: "2024/1",  value: 22.8 },
        { year: "2024/2",  value: 29.0 },
        { year: "2024/3",  value: 32.2 },
        { year: "2024/4",  value: 34.2 },
        { year: "2024/5",  value: 40.2 },
        { year: "2024/6",  value: 42.0, label: "42.0" },
        { year: "2024/7",  value: 40.5 },
        { year: "2024/8",  value: 42.0 },
        { year: "2024/9",  value: 27.4 },
        { year: "2024/10", value: 20.8 },
        { year: "2024/11", value: 17.8 },
        { year: "2024/12", value: 16.4 },
        // 2025
        { year: "2025/1",  value: 24.0 },
        { year: "2025/2",  value: 20.2 },
        { year: "2025/3",  value: 26.6 },
        { year: "2025/4",  value: 26.8 },
        { year: "2025/5",  value: 30.5 },
        { year: "2025/6",  value: 34.0 },
        { year: "2025/7",  value: 34.0 },
        { year: "2025/8",  value: 31.4 },
        { year: "2025/9",  value: 23.8 },
        { year: "2025/10", value: 25.2 },
        { year: "2025/11", value: 18.8 },
        { year: "2025/12", value: 18.2 },
        // 2026
        { year: "2026/1",  value: 18.0 },
        { year: "2026/2",  value: 23.5 },
        { year: "2026/3",  value: 23.6 },
        { year: "2026/4",  value: 24.8 },
        { year: "2026/5",  value: 25.5 },
      ],
    },
  },

  // p17-18 需求指數
  demandForecast: {
    title: "未來60天需求指數",
    subtitle: "2人入住 4/15-5/31 數據需求預估",
    regions: [
      { name: "墾丁", count: "140家", avg: "14%" },
      { name: "南灣", count: "66家", avg: "11%" },
      { name: "恆春", count: "232家", avg: "11%" },
      { name: "鵝鑾", count: "61家", avg: "9%" },
      { name: "東港", count: "67家", avg: "8%" },
      { name: "車城", count: "37家", avg: "6%" },
    ],
    peakNote: "未來60天高峰 五一勞動節",
    peakValue: "34%",
    marketComparison: {
      subtitle: "市場未來60天需求指數",
      data: [
        { name: "墾丁", avg: "14%" },
        { name: "小琉球", avg: "13%", peak: "81% (五一勞動節)" },
        { name: "恆春", avg: "10%" },
      ],
    },
  },

  // p19 市場總結
  marketSummary: {
    title: "市場總結",
    mainPoint: "國旅需求未能有效回流，顯示墾丁已從「大眾觀光熱點」轉為「需求分散型市場」",
    changes: [
      "國人出國旅遊大幅成長，分散國旅需求",
      "旅遊型態從「人潮型觀光」轉向「體驗型、目的型旅遊」",
      "年輕族群更重視「拍照感、設計感與住宿體驗」",
    ],
    conclusion: "整體而言，墾丁已不再是過去「人潮紅利市場」，而進入「產品力與品牌力競爭市場」，未來關鍵不在於吸引更多人，而在於吸引「對的人」",
  },

  // p20-22 產品研究
  productResearch: {
    title: "墾丁海境產品研究",
    subtitle: "顧客評分關鍵因素 · 房價潛力",
    photos: "+52 張",
    reviews: {
      title: "顧客關鍵回饋 總評分高於9分",
      platforms: [
        { name: "Agoda", score: "9.3 超棒", reviews: "604 篇評鑑", location: "9.1 位置得分" },
        { name: "Google 地圖", score: "4.8 ★", reviews: "496 則", price: "$6,737", tags: ["4星級飯店", "免費早餐"] },
        { name: "Booking.com", score: "9.5 傑出", reviews: "72 則評語" },
      ],
      testimonials: [
        { platform: "Booking.com", date: "2026年2月19日", score: "10", label: "傑出", text: "乾淨，親切，風景好美，有牛牛以外，還有七隻臘腸犬超超超可愛（早上10:00吃完早餐可以跟臘腸遛狗喔）" },
        { platform: "Agoda", date: "2025年12月28日", score: "", text: "風景優美 海景無敵 群山環繞 綠植盎然" },
        { platform: "Agoda", date: "2025年10月", score: "9.6 超棒", text: "風景優美 一面向山一面向海 這裡餵牛吃草唷 老闆娘及員工都超親切的", author: "hsiang（來自台灣）" },
      ],
      keyFactors: [
        "房價CP值",
        "地點方便性",
        "蚊蟲",
        "景觀",
        "服務品質",
        "環境整潔",
        "早餐豐盛度",
        "寵物",
      ],
    },
    optimization: {
      title: "產品畫面排序優化 — 增加點擊率 ＆ 轉換率",
      points: [
        "首頁特色照片組合優化",
        "增加房型空間感優勢",
        "建議調整「情境體驗型」增加客人對於空間想像的帶入感",
      ],
      bookingInfo: {
        name: "墾丁海境渡假民宿 (Kenting Ocean Paradise Resort)",
        tier: "民宿 ★★★★★",
        location: "恆春鎮, 墾丁 - 距市中心3.0公里",
        agodaScore: "9.3 超棒, 604 篇評鑑, 9.1 位置得分",
        priceOriginal: "NT$ 8,792",
        priceDiscount: "NT$ 6,610（75折）",
        bookingScore: "傑出 9.5, 72 則評語, 住宿地點 9.5",
        roomType: "海景雙人房－附陽台, 1 張特大雙人床, 包括早餐, 可免費取消",
        bookingPrice: "TWD 6,264（1 晚，2 位成人）",
        promo: "Spring 春季活動: 早鳥 9折 / 回客 85折",
      },
    },
  },

  // p23-25 市場競爭力
  competitiveness: {
    title: "市場競爭力",
    subtitle: "全覽：小旺季（5月）各日別均價",
    benchmarks: [
      { name: "四星平日均價", value: "$4,500" },
      { name: "五星平日均價", value: "$7,200" },
      { name: "海境平日均價", value: "$6,200" },
    ],
    properties: [
      { name: "凱撒", tier: "五星" },
      { name: "夏都", tier: "四星半" },
      { name: "華泰瑞苑", tier: "四星+" },
      { name: "H會館", tier: "四星" },
      { name: "墾丁福華", tier: "四星" },
      { name: "海境", tier: "民宿" },
      { name: "灣臥", tier: "精品民宿" },
    ],
    insight: "淡季入門最低價較高，旺季增幅幅度不明顯",
  },

  // p26 現況價格分析
  pricingAnalysis: {
    title: "現況價格分析",
    seasons: [
      {
        season: "小旺季（5月）早鳥9折",
        rooms: [
          { type: "雙人房A", weekday: 5220, friday: 5220, saturday: 6120, holiday: 6120 },
          { type: "雙人房B", weekday: 6120, friday: 6120, saturday: 7920, holiday: 7920 },
          { type: "VIP雙人房", weekday: 8820, friday: 8820, saturday: 10800, holiday: 10800 },
          { type: "四人房", weekday: 6480, friday: 6480, saturday: 7920, holiday: 7920 },
        ],
      },
      {
        season: "旺季（7月）",
        rooms: [
          { type: "雙人房A", weekday: 5800, friday: 5800, saturday: 6800, holiday: 6800 },
          { type: "雙人房B", weekday: 6800, friday: 6800, saturday: 8800, holiday: 8800 },
          { type: "VIP雙人房", weekday: 9800, friday: 9800, saturday: 12000, holiday: 12000 },
          { type: "四人房", weekday: 7200, friday: 7200, saturday: 8800, holiday: 8800 },
        ],
      },
    ],
    notes: [
      { title: "淡旺季價格價差10%", desc: "墾丁市場淡旺季需求幅度差異可達125%" },
      { title: "強週末價格差異15%", desc: "競爭對手溢價幅度可達100%" },
    ],
    seasonRule: "淡季（1-3月、11-12月）為最低房價；春秋季（4-6月、9-10月）中段；暑假（7-8月）為全年高峰，旺季房價有機會可翻倍銷售",
  },

  // p27 客群質變
  audienceShift: {
    title: "客群正在「質變」",
    subtitle: "「舊玩法沒人，新玩法還沒被做好」",
    comparison: [
      { old: "走景點", new: "找體驗" },
      { old: "逛夜市", new: "待在住宿" },
      { old: "便宜導向", new: "質感導向" },
    ],
    advantage: "海境優勢：景觀",
    future: "未來關鍵：從『看海住宿』升級為『完整體驗商品』",
  },

  // p28/35 總結建議方向
  recommendations: {
    title: "總結建議方向",
    items: [
      {
        no: "1",
        title: "淡旺季售價整合",
        points: ["依據旅遊淡旺季", "節慶活動規劃", "市場需求分析", "制定彈性房價策略"],
      },
      {
        no: "2",
        title: "售價評估調整",
        points: ["市場價格監測", "競爭對手分析", "歷史住房率分析", "動態價格調整"],
      },
      {
        no: "3",
        title: "各通路售價一致",
        points: ["整合 OTA / 官網價格", "同步更新房價資訊", "避免價差問題", "維持品牌信任感"],
      },
      {
        no: "4",
        title: "平台流量提升",
        points: ["提升曝光與點擊率", "優化轉換流程", "增加訂單轉換率", "提高住房率與營收"],
      },
    ],
    conclusion: "優先透過淡旺季房價整合、即時市場價格調整、各通路價格一致化及平台流量優化，全面提升住房率、訂單轉換率與整體營收效益",
  },

  // p29-31 旅宿營收整合方案
  servicePlan: {
    title: "旅宿營收整合方案",
    by: "By Angel & Ruby",
    team: [
      { name: "Ruby 黃毓倩", role: "飯店、OTA營收管理", experience: "年資10～11年" },
      { name: "Angel 吳月雲", role: "民宿、飯店、營收管理", experience: "年資10～11年" },
    ],
    teamLogos: [
      "承億文旅 HOTEL DAY+",
      "台北亞都麗緻大飯店 THE LANDIS TAIPEI",
      "承億酒店 TAi Urban Resort Kaohsiung",
      "厝味旅宿管理顧問股份有限公司",
      "博立思管理顧問股份有限公司 BLESS",
      "雀客國際酒店集團 CHECK Hotels Group",
    ],
    categories: [
      {
        category: "新館或房型建置",
        subtitle: "通路與系統建置",
        items: [
          "系統架構選型與配置建議（PMS、CM）",
          "PMS 系統資料建置與房型設定",
          "Channel Manager 申請與串接設定",
          "OTA 通路申請",
          "OTA 銷售頁面文案與資訊設定",
          "OTA 設備與服務資訊整理上架",
          "OTA 通路開通上線與銷售測試（BK / AG / EXP / TRIP）",
        ],
        price: "NT$35,000（視需求調整）",
      },
      {
        category: "線上平台運營管理",
        subtitle: "通路與系統建置 + 通路資訊管理 + 價格與市場分析",
        items: [
          "通路佈局邏輯與導入建議（BK/AG/EXP/TRIP）",
          "系統架構選型與配置建議（PMS、CM）",
          "通路內容策略與呈現重點建議",
          "房型與方案結構優化方向",
          "價格區間與價差策略建議",
          "市場定位與價格角色判斷",
        ],
        price: "NT$10,000/月",
      },
      {
        category: "旅宿營收策略管理",
        subtitle: "通路與平台策略 + 價格與庫存管理",
        price: "NT$10,000/月 + 5%",
        items: [
          "OTA 平台策略銷售建議",
          "OTA 曝光策略建議",
          "定價原則與策略建議",
          "房量配置與開關策略建議",
        ],
      },
      {
        category: "其他支援媒合服務",
        subtitle: "平台優化支援工具 + 品牌視覺與行銷支援",
        items: [
          "排名評分優化工具",
          "專業旅宿空間攝影",
        ],
        price: "視需求報價",
      },
    ],
  },

  // p32-33 啟動準備
  launchPrep: {
    title: "啟動準備",
    steps: [
      { title: "帳號權限加入", desc: "權限加入 - PMS、OTA" },
      { title: "物件資料搜集", desc: "各項住房資訊、設備、房型" },
      { title: "售價共識確認", desc: "各物件售價分析與確認、策略共識討論確認" },
      { title: "整合與操作進行", desc: "OTA、串接、售價、平台調整" },
      { title: "其他資源媒合", desc: "攝影、技術、RMS" },
      { title: "監測與優化", desc: "根據數據市場進行監測優化" },
    ],
  },
};
