"use client";
import { useMemo } from "react";

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="relative z-10 py-10 text-center text-white/60 text-sm">
      © {year} Happy Hours. Crafted at Forge Hackathon.
    </footer>
  );
}
