"use client";
import { useState, useEffect, useRef } from "react";

export default function ContactStamp() {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Determine interactive color based on state
  const activeAccentColor = isFocused ? "#B33622" : "#5C4F3A";
  const activeBorderColor = isFocused ? "#B33622" : "#8A7A6A";

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem" }}
    >
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 0.8rem)",
            right: 0,
            cursor: "inherit",
            background: "#F2EFE9",
            border: "1px solid #C8B89A",
            borderRadius: "2px",
            padding: "1rem 1.2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          <a
            href="mailto:rockstardeepanshu11@gmail.com"
            aria-label="Email rockstardeepanshu11@gmail.com"
            style={{
              fontSize: "0.8rem",
              color: "#2A2218",
              textDecoration: "none",
              letterSpacing: "0.03em",
              borderRadius: "2px",
              transition: "color 0.15s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.color = "#B33622")}
            onBlur={(e) => (e.currentTarget.style.color = "#2A2218")}
          >
            ✉ rockstardeepanshu11@gmail.com
          </a>
          <a
            href="https://wa.me/918851843305"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp +91 88518 43305"
            style={{
              fontSize: "0.8rem",
              color: "#2A2218",
              textDecoration: "none",
              letterSpacing: "0.03em",
              borderRadius: "2px",
              transition: "color 0.15s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.color = "#B33622")}
            onBlur={(e) => (e.currentTarget.style.color = "#2A2218")}
          >
            ✆ +91 88518 43305
          </a>
        </div>
      )}

      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label="Contact"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(!open);
          }
          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          border: `1.5px solid ${activeBorderColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          background: "#F2EFE9",
          outline: "none", // Removes the default blocky browser outline
          transition: "border-color 0.15s ease",
        }}
      >
        <svg
          viewBox="0 0 64 64"
          width="64"
          height="64"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <path
            id="stampArc"
            d="M 32,32 m -22,0 a 22,22 0 1,1 44,0 a 22,22 0 1,1 -44,0"
            fill="none"
          />
          <text
            style={{
              fontSize: "6.5px",
              fill: activeAccentColor,
              letterSpacing: "2.2px",
              fontFamily: "monospace",
              transition: "fill 0.15s ease",
            }}
          >
            <textPath href="#stampArc">CONTACT · CONTACT ·</textPath>
          </text>
        </svg>
        <span
          aria-hidden="true"
          style={{
            fontSize: "1rem",
            color: activeAccentColor,
            fontFamily: "monospace",
            lineHeight: 1,
            transition: "color 0.15s ease",
          }}
        >
          ✉
        </span>
      </div>
    </div>
  );
}
