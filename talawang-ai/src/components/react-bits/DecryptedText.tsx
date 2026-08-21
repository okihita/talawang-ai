"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "hover" | "view" | "mount";
}

export default function DecryptedText({
  text,
  speed = 45,
  maxIterations = 12,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+~`|}{[]:;?><,./-=",
  className = "",
  parentClassName = "",
  encryptedClassName = "text-emerald-400 font-bold",
  animateOn = "mount",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;

    const getNextChar = (char: string) => {
      if (useOriginalCharsOnly) {
        const positions = Array.from(text);
        return positions[Math.floor(Math.random() * positions.length)];
      }
      return characters[Math.floor(Math.random() * characters.length)];
    };

    const shuffleText = () => {
      if (currentIteration >= maxIterations) {
        setDisplayText(text);
        setIsScrambling(false);
        clearInterval(interval);
        return;
      }

      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (revealedIndices.has(index)) return text[index];
            if (sequential && index < (currentIteration / maxIterations) * text.length) {
              setRevealedIndices((prevIndices) => new Set(prevIndices).add(index));
              return text[index];
            }
            return getNextChar(char);
          })
          .join("")
      );

      currentIteration++;
    };

    if (animateOn === "mount" || (animateOn === "hover" && isHovering)) {
      setIsScrambling(true);
      setRevealedIndices(new Set());
      interval = setInterval(shuffleText, speed);
    } else {
      setDisplayText(text);
      setIsScrambling(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [animateOn, isHovering, text, speed, maxIterations, sequential, characters, useOriginalCharsOnly]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => animateOn === "hover" && setIsHovering(true)}
      onMouseLeave={() => animateOn === "hover" && setIsHovering(false)}
    >
      <span className={className}>
        {displayText.split("").map((char, index) => {
          const isRevealed = revealedIndices.has(index) || !isScrambling;
          return (
            <span
              key={index}
              className={isRevealed ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
