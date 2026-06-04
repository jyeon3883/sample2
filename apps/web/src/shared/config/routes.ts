import type { TabRouteConfig } from "@repo/ui/layout/mdi-shell";

export const routes = {
  home: "/",
  notice: "/notice",
  qna: "/qna",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

/**
 * MDI 탭으로 열릴 라우트 설정.
 * 새 페이지를 탭으로 추가하려면 여기에만 항목을 추가하면 됩니다.
 */
export const TAB_ROUTES: Record<string, TabRouteConfig> = {
  [routes.home]: {
    title: "홈",
    loader: () => import("@/views/home").then((m) => ({ default: m.HomePage })),
  },
  [routes.notice]: {
    title: "공지사항",
    loader: () => import("@/views/notice").then((m) => ({ default: m.NoticePage })),
  },
  [routes.qna]: {
    title: "Q&A",
    loader: () => import("@/views/qna").then((m) => ({ default: m.QnaPage })),
  },
};
