"use client"; // ➊ client-side for form handling

// ===============================
// File: src/app/signup/page.jsx
// Purpose: Gold-on-navy themed Signup page (name/email/password/confirm) for Happy Hours
// ===============================

export default function SignupPage() {
  // ➋ simple submit handler (replace later with real registration)
  const handleSubmit = (e) => {
    e.preventDefault();                         // ➌ stop default submit
    const data = new FormData(e.currentTarget); // ➍ collect fields
    const name = data.get("name");              // ➎ read name
    const email = data.get("email");            // ➏ read email
    const password = data.get("password");      // ➐ read pwd
    const confirm = data.get("confirm");        // ➑ read confirm
    if (password !== confirm) {                 // ➒ very basic check
      alert("Passwords do not match");
      return;
    }
    console.log({ name, email, password });     // ➓ temp debug
    // TODO: call your /api/signup or next-auth credentials provider
  };

  return (
    // ⓫ same gradient + glow background
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0b1220] via-[#0c1525] to-[#0e1a2b] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(245,192,68,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_85%,rgba(10,15,25,0.6),transparent_70%)]" />
      </div>

      {/* ⓬ centered card */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          {/* 🍸 brand */}
          <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-gradient-to-br from-[#f5c044] to-[#f2a91c] flex items-center justify-center shadow-[0_0_30px_rgba(245,192,68,0.35)]">
            <span className="font-black text-[#0d1016]">🍸</span>
          </div>

          {/* title */}
          <h1 className="text-center text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(180deg,#ffe07a_0%,#f5c044_50%,#e7c888_100%)]">
            Create your account
          </h1>

          {/* subtitle */}
          <p className="mt-2 text-center text-white/70">
            Join Happy Hours and get curated cocktail recommendations.
          </p>

          {/* form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* name */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-white/80">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Yash Joshi"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#f5c044] focus:ring-2 focus:ring-[#f5c044]/30"
              />
            </div>

            {/* email */}
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

            {/* password */}
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

            {/* confirm password */}
            <div>
              <label htmlFor="confirm" className="mb-2 block text-sm text-white/80">
                Confirm Password
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#f5c044] focus:ring-2 focus:ring-[#f5c044]/30"
              />
            </div>

            {/* submit (solid gold) */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl px-6 py-3 font-semibold text-[#0b1220] bg-[#f5c044] hover:brightness-110 active:brightness-95 shadow-[0_10px_35px_rgba(245,192,68,0.35)]"
            >
              Sign Up
            </button>
          </form>

          {/* links */}
          <div className="mt-6 text-center text-sm text-white/70">
            Already have an account?{" "}
            <a href="/login" className="text-[#f5c044] hover:brightness-110">
              Log in
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
