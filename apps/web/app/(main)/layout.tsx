"use client";

import type { ReactNode } from "react";
import { MdiMainLayout } from "@repo/ui/layout/mdi-shell";
import { appShellConfig } from "@/shared/config/appShell";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <MdiMainLayout config={appShellConfig}>{children}</MdiMainLayout>;
}
