"use client";

export default function Navbar() {
  return (
    <header className="relative z-10 sticky top-0">
      <nav className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#f5c044] to-[#f2a91c] flex items-center justify-center shadow-[0_0_35px_rgba(245,192,68,0.4)]">
            <span className="font-black text-[#0d1016]">🍸</span>
          </div>
          <span className="font-semibold tracking-wide text-[#f5c044]">Happy Hours</span>
        </div>

        <ul className="flex items-center gap-8 text-sm">
          <li><a href="#pipeline" className="text-[#f5c044]/90 hover:text-[#f5c044]">Pipeline</a></li>
          <li><a href="#team" className="text-[#f5c044]/90 hover:text-[#f5c044]">Team</a></li>
          <li><a href="#cta" className="text-[#f5c044]/90 hover:text-[#f5c044]">Demo</a></li>
        </ul>
      </nav>
    </header>
  );
}
