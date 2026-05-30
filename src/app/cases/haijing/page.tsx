import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Sections2";
import { HaijingCasePage } from "@/components/HaijingCase";

export const metadata: Metadata = {
  title: "墾丁海境渡假民宿 — 合作案例 | AfterTone",
  description: "恆春海境合作提案：市場及營收分析、客製化服務介紹",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink pt-20 overflow-x-hidden">
        <HaijingCasePage />
      </main>
      <Footer />
    </>
  );
}
