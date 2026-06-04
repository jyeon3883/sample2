import type { ComponentType, ReactNode } from "react";

/** MDI 탭으로 열릴 라우트 설정 */
export interface TabRouteConfig {
  title: string;
  loader: () => Promise<{ default: ComponentType }>;
}

/** 사이드바 메뉴 항목 */
export interface ShellMenuItem {
  label: string;
  href: string;
}

/**
 * 앱별 MDI Shell 설정 계약.
 * 신규 서비스(admin, web 등)는 이 타입만 구현하면 동일한 레이아웃을 사용할 수 있습니다.
 */
export interface AppShellConfig {
  /** 앱 식별자 (향후 MSA Host Shell에서 탭 상태 네임스페이스 분리용) */
  appId: string;
  /** MDI 탭으로 열릴 라우트 맵 (path → config) */
  tabRoutes: Record<string, TabRouteConfig>;
  /** 사이드바 메뉴 항목 */
  menuItems: ShellMenuItem[];
  /** 헤더 타이틀 */
  headerTitle: string;
  /** 헤더 우측 액션 슬롯 */
  headerActions?: ReactNode;
}
