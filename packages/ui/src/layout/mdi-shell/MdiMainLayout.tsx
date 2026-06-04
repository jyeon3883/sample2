"use client";

import {
  lazy,
  Suspense,
  useState,
  useEffect,
  useMemo,
  type ComponentType,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { BaseLayout } from "../BaseLayout";
import {
  MdiTabProvider,
  MdiTabBar,
  MdiTabPanel,
  useMdiTab,
  useMdiTabStore,
} from "../mdi";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import type { AppShellConfig } from "./types";

type MdiMainLayoutInnerProps = {
  config: AppShellConfig;
  children: ReactNode;
};

function getPageTitle(config: AppShellConfig, pathname: string): string {
  return config.tabRoutes[pathname]?.title ?? pathname;
}

function MdiMainLayoutInner({ config, children }: MdiMainLayoutInnerProps) {
  const pageComponentMap = useMemo<Record<string, ComponentType>>(
    () =>
      Object.fromEntries(
        Object.entries(config.tabRoutes).map(([path, cfg]) => [path, lazy(cfg.loader)]),
      ),
    [config.tabRoutes],
  );

  const { openTab, restoreTab, tabs } = useMdiTab();
  const pathname = usePathname();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    return useMdiTabStore.persist.onFinishHydration(() => {
      const s = useMdiTabStore.getState();
      const unknownSet = new Set(
        s.tabsMeta.filter((m) => !pageComponentMap[m.id]).map((m) => m.id),
      );

      unknownSet.forEach((id) => {
        s.removeTabMeta(id);
        s.removeMounted(id);
        s.removeTabState(id);
      });

      if (s.activeId && unknownSet.has(s.activeId)) {
        const remaining = s.tabsMeta.filter((m) => !unknownSet.has(m.id));
        s.setActiveId(remaining[0]?.id ?? null);
      }

      s.tabsMeta.forEach((meta) => {
        if (unknownSet.has(meta.id)) return;
        const component = pageComponentMap[meta.id];
        if (component) restoreTab(meta.id, component);
      });

      setHydrated(true);
    });
  }, [restoreTab, pageComponentMap]);

  useEffect(() => {
    if (!hydrated) return;
    const component = pageComponentMap[pathname];
    if (component) openTab(pathname, getPageTitle(config, pathname), component);
  }, [pathname, openTab, hydrated, pageComponentMap, config]);

  const activeId = useMdiTabStore((s) => s.activeId);
  useEffect(() => {
    if (!hydrated || !activeId || activeId === pathname) return;
    router.push(activeId);
  }, [activeId, hydrated, pathname, router]);

  return (
    <BaseLayout
      header={
        <AppHeader title={config.headerTitle} actions={config.headerActions} />
      }
      sidebar={<AppSidebar menuItems={config.menuItems} />}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <MdiTabBar />
        {tabs.length > 0 ? (
          <Suspense fallback={<Box sx={{ p: 2 }}>로딩 중...</Box>}>
            <MdiTabPanel />
          </Suspense>
        ) : (
          <Box sx={{ p: 2 }}>{children}</Box>
        )}
      </Box>
    </BaseLayout>
  );
}

type MdiMainLayoutProps = {
  config: AppShellConfig;
  children: ReactNode;
};

/**
 * MDI 탭 기반 메인 레이아웃.
 * 앱별 `AppShellConfig`만 주입하면 header/sidebar/탭 동기화가 동작합니다.
 */
export function MdiMainLayout({ config, children }: MdiMainLayoutProps) {
  return (
    <MdiTabProvider>
      <MdiMainLayoutInner config={config}>{children}</MdiMainLayoutInner>
    </MdiTabProvider>
  );
}
