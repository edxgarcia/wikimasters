import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NavBar } from "@/components/nav/nav-bar";

export const metadata: Metadata = {
  title: "Wikimasters",
  description:
    "Wikimasters is a collaborative wiki where you can write, edit, and share articles, with AI-generated summaries.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="h-full antialiased">
        <NavBar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
