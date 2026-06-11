"use client";
import { useState, useEffect, useRef } from "react";

export default function ContactStamp() {
  const [open, setOpen] = useState(false);
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
            style={{
              fontSize: "0.8rem",
              color: "#2A2218",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
          >
            ✉ rockstardeepanshu11@gmail.com
          </a>
          <a
            href="https://wa.me/918851843305"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.8rem",
              color: "#2A2218",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
          >
            ✆ +91 88518 43305
          </a>
        </div>
      )}

      <div
        onClick={() => setOpen(!open)}
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          border: "1.5px solid #8A7A6A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          background: "#F2EFE9",
        }}
      >
        <svg
          viewBox="0 0 64 64"
          width="64"
          height="64"
          style={{ position: "absolute" }}
        >
          <path
            id="stampArc"
            d="M 32,32 m -22,0 a 22,22 0 1,1 44,0 a 22,22 0 1,1 -44,0"
            fill="none"
          />
          <text
            style={{
              fontSize: "6.5px",
              fill: "#5C4F3A",
              letterSpacing: "2.2px",
              fontFamily: "monospace",
            }}
          >
            <textPath href="#stampArc">CONTACT · CONTACT ·</textPath>
          </text>
        </svg>
        <span
          style={{
            fontSize: "1rem",
            color: "#5C4F3A",
            fontFamily: "monospace",
            lineHeight: 1,
          }}
        >
          ✉
        </span>
      </div>
    </div>
  );
}
