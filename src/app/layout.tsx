import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/store/provider";

export const metadata: Metadata = {
  title: "RateLimitr — Rate Limit Everything",
  description:
    "Production-grade rate limiting with fixed window, token bucket, leaky bucket, and sliding window strategies. Real-time analytics via TimescaleDB.",
  keywords: [
    "rate limiting",
    "API",
    "Redis",
    "token bucket",
    "fixed window",
    "TimescaleDB",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070B14] text-white antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
