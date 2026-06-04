"use client";

import { Typography } from "@repo/ui";
import { DemoDashboard } from "./DemoDashboard";

export function HomePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <Typography variant="h4" component="h1">
        Next.js 16.1 Monorepo
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        React 19.2.1 · axios · TanStack Query · Orval · MUI atoms/molecules
      </Typography>
      <DemoDashboard />
    </main>
  );
}
