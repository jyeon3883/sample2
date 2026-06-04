import type { AppShellConfig } from "@repo/ui/layout/mdi-shell";
import { routes, TAB_ROUTES } from "./routes";

export const appShellConfig: AppShellConfig = {
  appId: "admin",
  tabRoutes: TAB_ROUTES,
  menuItems: [
    { label: "대시보드", href: routes.home },
    { label: "사용자 관리", href: routes.users },
    { label: "설정", href: routes.settings },
  ],
  headerTitle: "Admin Console",
};
