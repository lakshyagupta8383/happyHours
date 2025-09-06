"use client";

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="relative mb-8">
        <div className="h-28 w-28 rounded-full border border-[#e7c888]/60 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm flex items-center justify-center shadow-[0_6px_60px_rgba(245,192,68,0.35)]">
          <div className="h-20 w-20 rounded-full bg-[radial-gradient(circle_at_30%_20%,#f5c044,transparent_55%)] flex items-center justify-center">
            <span className="text-[#0b1220] text-3xl">🍸</span>
          </div>
        </div>
        <div className="absolute inset-0 rounded-full ring-2 ring-[#f5c044]/30 blur-[2px]" />
      </div>

      <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(180deg,#ffe07a_0%,#f5c044_50%,#e7c888_100%)] drop-shadow-[0_6px_30px_rgba(245,192,68,0.25)]">
        HAPPY HOURS
      </h1>

      <p className="mt-6 max-w-3xl text-xl md:text-2xl text-white/85 leading-relaxed">
        A premium, AI-powered bartender that knows your vibe. Chat cocktails, discover pairings,
        and get curated recommendations — wrapped in a luxe lounge aesthetic.
      </p>

      <div className="mt-10 flex flex-row items-center gap-6">
        <a href="/signup" className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-semibold text-[#0b1220] bg-[#f5c044] hover:brightness-110 active:brightness-95 shadow-[0_10px_35px_rgba(245,192,68,0.35)]">
          Try the Demo
        </a>
      </div>
    </section>
  );
}
