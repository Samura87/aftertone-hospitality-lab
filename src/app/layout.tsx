import type { Metadata } from "next";
import { Noto_Serif_TC, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const serifTC = Noto_Serif_TC({
  variable: "--font-serif-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sansTC = Noto_Sans_TC({
  variable: "--font-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "AfterTone Hospitality Lab｜餘是旅宿管理顧問",
  description:
    "AfterTone Hospitality Lab 餘是旅宿管理顧問有限公司 — 為精品旅宿打造靜感沉浸式體驗。市場收益顧問、五大體驗模組、ESG 永續方向，陪伴旅宿走向下一個十年。",
  keywords: [
    "旅宿顧問",
    "民宿營收管理",
    "OTA 營收",
    "體驗旅宿",
    "ESG 永續旅宿",
    "AfterTone",
    "靜感體驗",
  ],
  openGraph: {
    title: "AfterTone Hospitality Lab｜餘是旅宿管理顧問",
    description: "靜感沉浸式體驗旅宿顧問 — Rich experience. Your frequency. Long after you leave.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${serifTC.variable} ${sansTC.variable} h-full`}
    >
      <body className="grain min-h-full antialiased">{children}</body>
    </html>
  );
}
