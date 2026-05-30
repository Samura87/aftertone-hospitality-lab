"use client";

import { useState } from "react";

/**
 * SlotImage — 圖片槽位元件
 * 圖片存在時正常顯示；檔案不存在 / 載入失敗時，自動以墨綠漸層 +
 * 說明文字佔位，讓版面在「還沒放圖」的階段也保持完整美觀。
 *
 * 使用者只要把圖片檔放到 public/ 對應路徑，畫面就會自動換成實圖，
 * 無需改任何程式碼。
 */
export function SlotImage({
  src,
  alt,
  caption,
  className = "",
  imgClassName = "",
  ratio,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  ratio?: string; // e.g. "3/2", "16/9", "4/5"
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-pine ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <Placeholder label={caption || alt} />
      )}
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0">
      {/* gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-moss via-pine to-ink" />
      {/* faint jade glow */}
      <div className="glow-jade absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 opacity-70" />
      {/* hairline frame */}
      <div className="absolute inset-3 rounded-xl border border-jade/15" />
      {/* center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          className="text-jade/55"
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <circle cx="8.5" cy="9" r="1.6" stroke="currentColor" strokeWidth="1.3" />
          <path
            d="M4 17l4.5-4.5 3.5 3.5 3-3L20 16.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-xs leading-relaxed text-sand-dim/70">{label}</p>
        <p className="text-[0.62rem] tracking-[0.2em] text-jade/40">
          IMAGE SLOT · 放入圖片即顯示
        </p>
      </div>
    </div>
  );
}
