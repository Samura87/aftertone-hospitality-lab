"use client";

import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  const titleColor = dark ? "text-char" : "text-sand";
  const subColor = dark ? "text-char/60" : "text-sand-dim";
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal>
        <p className="eyebrow mb-4 text-jade">{eyebrow}</p>
      </Reveal>
      <Reveal delay={1}>
        <h2
          className={`font-serif-tc text-3xl font-500 leading-snug sm:text-4xl lg:text-5xl ${titleColor}`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={2}>
          <p className={`mt-5 max-w-2xl text-base leading-relaxed ${subColor} ${align === "center" ? "mx-auto" : ""}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
