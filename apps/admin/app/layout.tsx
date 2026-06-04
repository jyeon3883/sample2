import type { Metadata } from "next";
import { ReactNode } from "react";
import "@repo/env/admin";

import { AppProviders } from "@/app/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin App",
  description: "Admin sample app in Turborepo workspace",
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
