"use client";
import { useState, useEffect } from "react";

// Returns the revealed string character by character after a delay
// revealed = "" until delay passes, then builds up char by char
export function useReveal(text: string, delayMs = 2500, charIntervalMs = 45): string {
  const [revealed, setRevealed] = useState("");

  useEffect(() => {
    setRevealed(""); 
    if (!text) return;
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