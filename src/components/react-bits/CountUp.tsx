"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  decimals = 0,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const [count, setCount] = useState(from);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const progress = Math.min((timestamp - startTimeRef.current) / (duration * 1000), 1);
        
        // easeOutExpo function for snappy high-tech feel
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentCount =
          direction === "up"
            ? from + (to - from) * easeOut
            : from - (from - to) * easeOut;

        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setCount(to);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [to, from, direction, delay, duration]);

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
