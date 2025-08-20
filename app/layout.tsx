
import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "TipFlux Base",
  description: "Gasless ETH tipping across Base-powered social moments — instant, trusted, and creator-ready.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "/hero-image.png",
      button: {
        title: "Launch TipFlux Base",
        action: {
          type: "launch_frame",
          name: "TipFlux Base",
          url: process.env.NEXT_PUBLIC_URL,
          splashImageUrl: "/splash-image.png",
          splashBackgroundColor: "#1a1625",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
