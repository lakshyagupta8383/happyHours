import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Pipeline from "../components/Pipeline";
import Team from "../components/Team";     // ✅ new
import Footer from "../components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0b1220] via-[#0c1525] to-[#0e1a2b] text-white overflow-x-hidden">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(245,192,68,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_85%,rgba(10,15,25,0.6),transparent_70%)]" />
      </div>

      <Navbar />
      <Hero />
      <Pipeline />
      <Team />      
      <Footer />
    </div>
  );
}
