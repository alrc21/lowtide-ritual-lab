import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lowtide Ritual (Lab) — Strategy & Development",
  description: "The lab side of Lowtide Ritual: research, strategy, identity, and pipeline. Valencia, Spain.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@200,300,400,500,700,800,900&f[]=sentient@300,400,500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
