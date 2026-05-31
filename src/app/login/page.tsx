"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      router.replace("/");
    } else {
      setError(true);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0e120f] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-serif-tc text-2xl font-600 tracking-wide text-[#e8e0d0]">
            After<span className="text-[#6b9e78]">Tone</span>
          </p>
          <p className="mt-1 text-[0.6rem] tracking-[0.2em] text-[#e8e0d0]/40">
            餘是旅宿管理顧問有限公司
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="請輸入訪問密碼"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#e8e0d0] placeholder-white/30 outline-none focus:border-[#6b9e78]/60 focus:ring-0"
            autoFocus
          />
          {error && (
            <p className="text-center text-xs text-red-400">密碼錯誤，請再試一次</p>
          )}
          <button
            type="submit"
            className="rounded-lg bg-[#6b9e78]/20 py-3 text-sm tracking-widest text-[#6b9e78] transition hover:bg-[#6b9e78]/30"
          >
            進入
          </button>
        </form>
      </div>
    </main>
  );
}
