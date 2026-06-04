import type { AppShellConfig } from "@repo/ui/layout/mdi-shell";
import { routes, TAB_ROUTES } from "./routes";

export const appShellConfig: AppShellConfig = {
  appId: "web",
  tabRoutes: TAB_ROUTES,
  menuItems: [
    { label: "홈", href: routes.home },
    { label: "공지사항", href: routes.notice },
    { label: "Q&A", href: routes.qna },
  ],
  headerTitle: "Web App",
};
