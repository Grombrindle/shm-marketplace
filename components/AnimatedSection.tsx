// components/AnimatedSection.tsx
"use client";

import { useEffect, useState } from "react";

export default function AnimatedSection() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("heroAnimationPlayed");
    if (!hasPlayed) {
      setShouldAnimate(true);
      sessionStorage.setItem("heroAnimationPlayed", "true");
    }
  }, []);

  return (
    <div className={shouldAnimate ? "animate-reveal-up" : ""}>
      {/* Optional: wrapper for any content you want animated once */}
    </div>
  );
}
