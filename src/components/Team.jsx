"use client";

export default function Team() {
  const members = [
    { init: "YJ", name: "Yash Joshi", role: "DevOps & Web" },
    { init: "LG", name: "Lakshya Gupta", role: "Frontend & Design" },
    { init: "RS", name: "Ripun Sethia", role: "Backend & Search" },
  ];

  return (
    <section id="team" className="relative z-10 mx-auto max-w-6xl px-6 pt-6 pb-24">
      <h2 className="text-3xl font-bold text-center mb-10">Meet the Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {members.map((m) => (
          <div
            key={m.name}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 
                       shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.25)] 
                       hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition"
          >
            {/* Avatar */}
            <div className="aspect-square rounded-2xl border border-white/10 
                            bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.06),transparent_60%)] 
                            flex items-center justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#f5c044] to-[#f2a91c] 
                              text-[#0b1220] font-bold text-xl flex items-center justify-center">
                {m.init}
              </div>
            </div>

            {/* Name + role */}
            <div className="text-center">
              <h3 className="font-semibold text-lg text-white">{m.name}</h3>
              <p className="text-sm text-white/70 mt-1">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
