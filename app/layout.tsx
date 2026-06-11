import type { Metadata } from "next";
import ClientLayout from "./components/ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deepanshu Yadav — Full-Stack Developer",
  description:
    "A working log of things built, broken, and occasionally unexplained.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
