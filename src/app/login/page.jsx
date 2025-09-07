"use client"; // ➊ enable client-side interactivity for the form

// ===============================
// File: src/app/login/page.jsx
// Purpose: Gold-on-navy themed Login page (email + password) for Happy Hours
// Notes: Standalone page with same gradient, glow, and button styling as landing.
// ===============================

export default function LoginPage() {
  // ➋ simple submit handler (replace later with real auth)
  const handleSubmit = (e) => {
    e.preventDefault();             // ➌ stop default page reload
    const data = new FormData(e.currentTarget); // ➍ collect form data
    const email = data.get("email");           // ➎ read email
    const password = data.get("password");     // ➏ read password
    console.log({ email, password });          // ➐ temp debug (replace with API call)
    // TODO: call your /api/login or next-auth signIn()
  };

  return (
    // ➑ page wrapper with same background gradient + white text
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0b1220] via-[#0c1525] to-[#0e1a2b] text-white">
      {/* ➒ ambient vignette/glow layers */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(245,192,68,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_85%,rgba(10,15,25,0.6),transparent_70%)]" />
      </div>

      {/* ➓ centered auth card */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          {/* 🍸 brand mark */}
          <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-gradient-to-br from-[#f5c044] to-[#f2a91c] flex items-center justify-center shadow-[0_0_30px_rgba(245,192,68,0.35)]">
            <span className="font-black text-[#0d1016]">🍸</span>
          </div>

          {/* title */}
          <h1 className="text-center text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(180deg,#ffe07a_0%,#f5c044_50%,#e7c888_100%)]">
            Welcome back
          </h1>

          {/* subtitle */}
          <p className="mt-2 text-center text-white/70">
            Sign in to continue your Happy Hours experience.
          </p>

          {/* form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* email field */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-white/80">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#f5c044] focus:ring-2 focus:ring-[#f5c044]/30"
              />
            </div>

            {/* password field */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-white/80">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#f5c044] focus:ring-2 focus:ring-[#f5c044]/30"
              />
            </div>

            {/* submit button (solid gold) */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl px-6 py-3 font-semibold text-[#0b1220] bg-[#f5c044] hover:brightness-110 active:brightness-95 shadow-[0_10px_35px_rgba(245,192,68,0.35)]"
            >
              Log In
            </button>
          </form>

          {/* links */}
          <div className="mt-6 text-center text-sm text-white/70">
            New here?{" "}
            <a href="/signup" className="text-[#f5c044] hover:brightness-110">
              Create an account
            </a>
          </div>

          {/* back home */}
          <div className="mt-2 text-center">
            <a href="/" className="text-xs text-white/60 hover:text-white/80">
              ← Back to Home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
