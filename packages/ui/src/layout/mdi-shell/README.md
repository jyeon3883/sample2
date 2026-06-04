# MDI Shell

admin/web 등 여러 앱이 공유하는 MDI 탭 레이아웃 계약입니다.

## 빠른 시작

1. 앱별 `AppShellConfig`를 정의합니다.

```ts
// apps/<app>/src/shared/config/appShell.ts
import type { AppShellConfig } from "@repo/ui/layout/mdi-shell";
import { TAB_ROUTES } from "./routes";

export const appShellConfig: AppShellConfig = {
  appId: "web",
  tabRoutes: TAB_ROUTES,
  menuItems: [
    { label: "홈", href: "/" },
    { label: "공지사항", href: "/notice" },
  ],
  headerTitle: "Web App",
};
```

2. Next.js `(main)/layout.tsx`에서 `MdiMainLayout`을 사용합니다.

```tsx
"use client";

import { MdiMainLayout } from "@repo/ui/layout/mdi-shell";
import { appShellConfig } from "@/shared/config/appShell";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <MdiMainLayout config={appShellConfig}>{children}</MdiMainLayout>;
}
```

3. 새 탭 페이지는 `TAB_ROUTES`에만 추가하면 layout 수정 없이 반영됩니다.

## AppShellConfig 계약

| 필드 | 설명 |
| --- | --- |
| `appId` | 앱 식별자. MSA Host Shell에서 탭/상태 네임스페이스 분리 시 사용 |
| `tabRoutes` | path → `{ title, loader }` 맵 |
| `menuItems` | 사이드바 메뉴 |
| `headerTitle` | 헤더 타이틀 |
| `headerActions` | 헤더 우측 슬롯 (선택) |

## MSA 확장 포인트

- **1단계 (현재)**: 모노레포 내 `@repo/ui/layout/mdi-shell` 공유
- **2단계 (서비스 추가)**: 신규 앱은 `AppShellConfig` + `MdiMainLayout`만 연결
- **3단계 (MSA)**: Host Shell이 `MdiMainLayout`을 소유하고, 각 도메인 서비스는 `tabRoutes.loader`로 remote/module을 주입

### 신규 서비스 체크리스트

- [ ] `apps/<service>/src/shared/config/routes.ts` — `TAB_ROUTES` 정의
- [ ] `apps/<service>/src/shared/config/appShell.ts` — `AppShellConfig` 구현
- [ ] `apps/<service>/app/(main)/layout.tsx` — `MdiMainLayout` 연결
- [ ] `appId`를 서비스별로 고유하게 설정
