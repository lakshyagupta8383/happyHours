"use client";
import { useState } from "react";

export default function Pipeline() {
  const [activeStep, setActiveStep] = useState("4");

  const steps = [
    ["1", "Ideation"],
    ["2", "Data"],
    ["3", "RAG"],
    ["4", "Elastic"],
    ["5", "Agent"],
    ["6", "UI"],
    ["7", "Demo"],
  ];

  // helper: get index of active step
  const activeIndex = steps.findIndex(([n]) => n === activeStep);

  return (
    <section id="pipeline" className="relative z-10 mx-auto max-w-6xl px-6 pb-12">
      <h2 className="text-3xl font-bold text-center mb-10">Project Pipeline</h2>

      <div className="relative mx-auto max-w-4xl">
        {/* background line */}
        <div className="h-1 bg-white/10 rounded-full relative">
          {/* gold filled portion */}
          <div
            className="absolute h-1 bg-[#f5c044] rounded-full transition-all duration-500"
            style={{
              width: `${(activeIndex / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* clickable steps */}
        <div className="mt-6 grid grid-cols-7 gap-3 text-center text-xs md:text-sm text-white/70">
          {steps.map(([n, label], i) => {
            const isActive = activeStep === n;
            const isCompleted = i <= activeIndex;

            return (
              <button
                key={n}
                onClick={() => setActiveStep(n)}
                className="flex flex-col items-center gap-2 focus:outline-none"
              >
                <div
                  className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? "bg-[#f5c044] text-[#0b1220] border-transparent shadow-[0_6px_30px_rgba(245,192,68,0.45)] scale-110"
                      : isCompleted
                      ? "bg-[#f5c044]/20 border-[#f5c044]/60 text-white"
                      : "bg-white/[0.02] border-white/10 hover:border-[#f5c044]/50"
                  }`}
                >
                  <span className="font-semibold">{n}</span>
                </div>
                <span className={isActive ? "text-white font-medium" : ""}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content per step */}
      <div className="mt-10 text-center">
        {activeStep === "1" && <p className="text-lg text-white/80">💡 Brainstorming concepts and features.</p>}
        {activeStep === "2" && <p className="text-lg text-white/80">📊 Collecting and cleaning cocktail data.</p>}
        {activeStep === "3" && <p className="text-lg text-white/80">🤖 Implementing RAG for recommendations.</p>}
        {activeStep === "4" && <p className="text-lg text-white/80">🔍 Setting up Elasticsearch for search.</p>}
        {activeStep === "5" && <p className="text-lg text-white/80">🧑‍🍳 Building AI bartender agent logic.</p>}
        {activeStep === "6" && <p className="text-lg text-white/80">🎨 Designing luxe lounge UI.</p>}
        {activeStep === "7" && <p className="text-lg text-white/80">🍹 Running the live demo.</p>}
      </div>
    </section>
  );
}
