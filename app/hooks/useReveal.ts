"use client";
import { useState, useEffect } from "react";

// Returns the revealed string character by character after a delay
// Respects prefers-reduced-motion by bypassing animations entirely
export function useReveal(text: string, delayMs = 2500, charIntervalMs = 45): string {
  const [revealed, setRevealed] = useState("");

  useEffect(() => {
    if (!text) {
      setRevealed("");
      return;
    }

    // 1. Check user system motion preferences
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // 2. Safely bypass timeouts and interval loops if motion is restricted
    if (mediaQuery.matches) {
      setRevealed(text);
      return;
    }

    // 3. Normal typing workflow if motion is fine
    setRevealed(""); 
    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setRevealed(text.slice(0, charIndex));
        if (charIndex >= text.length) clearInterval(intervalId);
      }, charIntervalMs);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delayMs, charIntervalMs]);

  return revealed;
}