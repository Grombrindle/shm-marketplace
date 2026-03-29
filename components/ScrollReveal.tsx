// components/ScrollReveal.tsx
"use client";

import { useEffect, useRef, useState, ReactNode, useLayoutEffect } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "reveal-up" | "fade-in" | "slide-left" | "slide-right";
  playOnce?: boolean;
  onceKey?: string;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  animation = "reveal-up",
  playOnce = true,
  onceKey,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);

  // Generate a stable key if not provided
  const storageKey = onceKey || `scrollReveal:${animation}:${delay}`;

  // useLayoutEffect runs before paint, preventing race conditions
  useLayoutEffect(() => {
    if (!playOnce || typeof window === "undefined") {
      setShouldAnimate(true);
      return;
    }

    const hasPlayed = sessionStorage.getItem(storageKey);
    setShouldAnimate(!hasPlayed);
  }, [playOnce, storageKey]);

  useEffect(() => {
    // Wait until storage check is complete
    if (shouldAnimate === null) return;

    const el = ref.current;
    if (!el) return;

    const checkInView = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    };

    if (checkInView()) {
      setVisible(true);
      if (shouldAnimate) {
        sessionStorage.setItem(storageKey, "true");
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (shouldAnimate) {
            sessionStorage.setItem(storageKey, "true");
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldAnimate, storageKey]);

  const canAnimate = visible && shouldAnimate;

  return (
    <div
      ref={ref}
      className={`${className} ${canAnimate ? `animate-${animation}` : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
