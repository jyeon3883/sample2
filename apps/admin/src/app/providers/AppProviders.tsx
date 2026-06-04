"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryProvider } from "@repo/query";
import { UiThemeProvider } from "@repo/ui";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <UiThemeProvider>
        <QueryProvider>{children}</QueryProvider>
      </UiThemeProvider>
    </AppRouterCacheProvider>
  );
}
