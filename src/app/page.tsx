import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Philosophy, Timeline, Process } from "@/components/Sections";
import { CasesPreview } from "@/components/CasesPreview";
import {
  ESG,
  Metrics,
  Pricing,
  Contact,
  Footer,
} from "@/components/Sections2";
import { ScrollToTop, SnapController } from "@/components/ScrollManager";

export default function Home() {
  return (
    <div id="snap-container" className="h-screen overflow-y-auto">
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Philosophy />
        <Metrics />
        <Process />
        <ESG />
        <CasesPreview />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <SnapController />
      <ScrollToTop />
    </div>
  );
}
