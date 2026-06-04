import type { TabRouteConfig } from "@repo/ui/layout/mdi-shell";

export const routes = {
  home: "/",
  users: "/users",
  settings: "/settings",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

/**
 * MDI 탭으로 열릴 라우트 설정.
 * 새 페이지를 탭으로 추가하려면 여기에만 항목을 추가하면 됩니다.
 */
export const TAB_ROUTES: Record<string, TabRouteConfig> = {
  [routes.home]: {
    title: "대시보드",
    loader: () => import("@/views/home").then((m) => ({ default: m.AdminHomePage })),
  },
  [routes.users]: {
    title: "사용자 관리",
    loader: () => import("@/views/users").then((m) => ({ default: m.UsersPage })),
  },
  [routes.settings]: {
    title: "설정",
    loader: () => import("@/views/settings").then((m) => ({ default: m.SettingsPage })),
  },
};
