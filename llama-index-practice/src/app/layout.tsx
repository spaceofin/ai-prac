import type { Metadata } from "next";
import "./globals.css";
import "./lib/ollamaConfig";

export const metadata: Metadata = {
  title: "Llama Index Practice",
  description: "An app for practicing LlamaIndex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
