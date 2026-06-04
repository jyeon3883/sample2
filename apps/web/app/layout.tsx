import type { Metadata } from "next";
import { ReactNode } from "react";
import "@repo/env/web";

import { AppProviders } from "@/app/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web App",
  description: "Next.js 16.1 + TanStack Query monorepo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
