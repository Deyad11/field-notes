import type { Metadata } from "next";
import { Crimson_Pro, Caveat } from "next/font/google";
import ClientLayout from "./components/ClientLayout";
import "./globals.css";

// Configure optimized Google fonts natively
const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson-pro", // Connects local font map to a class hook
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deepanshu Yadav — Full-Stack Developer",
  description:
    "A working log of things built, broken, and occasionally unexplained.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* The raw link tags have been completely removed. 
        Next.js injects font asset optimization tags under the hood.
      */}
      <body className={`${crimsonPro.variable} ${caveat.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
