import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import { DemoProvider } from "@/components/demo-provider";

export const metadata: Metadata = {
  title: "ModelSentinel — AI Model Trust Infrastructure",
  description: "Trust what your AI is actually doing."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth"><body><DemoProvider>{children}</DemoProvider></body></html>;
}
