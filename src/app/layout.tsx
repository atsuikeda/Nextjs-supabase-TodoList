import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TodoList",
  description: "Next.js Supabase TodoList",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
