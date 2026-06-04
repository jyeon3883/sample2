# next-tanstack-monorepo

멀티앱 (`apps/web`, `apps/admin`) + 공유 패키지 monorepo (React **19.2.1**, Next **16.1.0**)

---

## 빠른 시작

> 처음 프로젝트를 받았다면 여기서 시작합니다.

### 1. 사전 준비
Node.js 20 이상이 필요합니다. 버전 확인:

```bash
node -v   # v20.x.x 이상이어야 합니다.
```

### 2. pnpm 설치

```bash
npm install -g pnpm@10.26.1
```

### 3. 의존성 설치 및 실행

```powershell
corepack enable
corepack prepare pnpm@10.26.1 --activate
pnpm install
pnpm dev:web
pnpm dev:admin
```

### 4. 실행 확인

- Web 앱 → [http://localhost:3000](http://localhost:3000)
- Admin 샘플 앱 → [http://localhost:3100](http://localhost:3100)

### 5. 환경 변수 준비
루트 `.env.example`을 참고해 아래 env 파일만 사용합니다.

| 파일 | 용도 | 커밋 |
| ---- | ---- | ---- |
| `.env.dev` | 개발 환경 기본값 | 가능 |
| `.env.prod` | 운영 환경 기본값 | 가능 |
| `.env.local` | 로컬 개인 오버라이드 | 금지 (gitignore) |

로드 위치 (우선순위: 루트 → 앱 → `.env.local`):
- 루트: `.env.dev` / `.env.prod` (공통 변수)
- `apps/web`, `apps/admin`: 앱 전용 변수

Orval codegen은 `APP_TARGET`에 따라 해당 앱 env를 우선 로드합니다.

```powershell
# web 기준 codegen
pnpm codegen

# admin 기준 codegen (필요 시)
$env:APP_TARGET="admin"; pnpm codegen
```

### 스크립트 목록

| 명령               | 설명                              |
| ------------------ | --------------------------------- |
| `pnpm dev:web`     | web 개발 서버 (localhost:3000)    |
| `pnpm dev:admin`   | admin 개발 서버 (localhost:3100)  |
| `pnpm build`       | 워크스페이스 전체 빌드 (Turbo)    |
| `pnpm build:web`   | web 앱 빌드                       |
| `pnpm build:admin` | admin 앱 빌드                     |
| `pnpm lint`        | ESLint 검사                       |
| `pnpm typecheck`   | TypeScript 타입 검사              |
| `pnpm codegen`     | Orval API 클라이언트 생성         |
| `pnpm storybook`   | 스토리북 (localhost:6006)         |

### 앱 구조 안내

| 위치 | 역할 |
| --- | --- |
| `apps/web/app/` | Next.js App Router 라우트 진입점 |
| `apps/web/src/` | web 앱 비즈니스 코드 (4계층 Feature-Driven) |
| `apps/admin/app/` | Admin Next.js App Router |
| `apps/admin/src/` | admin 앱 전용 코드 |
| `packages/env/` | 앱별 환경변수 Zod 검증 모듈 |
| `packages/` | 공유 소프트웨어 패키지 (ui, api-client, query, types) |

---

## 프로젝트 이해하기

### 이 프로젝트는 어떤 구조인가요?

"**URL 하나 = 탭 하나**" 방식으로 동작하는 MDI(Multiple Document Interface) 타입입니다.  
공지사항 탭을 열고 Q&A 탭을 열어 여러 화면을 동시에 띄울 수 있습니다.

코드는 두 영역으로 나뉩니다.

| 영역 | 위치 | 설명 |
| --- | --- | --- |
| 앱 코드 | `apps/*/app/`, `apps/*/src/` | 각 앱에서만 쓰는 화면/기능 |
| 공통 패키지 | `packages/` | web·admin이 함께 쓰는 UI, API, Query 등 |

### 폴더 구조는 어떤 방식인가요?

이 레포는 **Monorepo + 실용적 Feature-Driven(기능 중심) 4계층** 조합입니다.

| 바깥 (Monorepo) | 안쪽 (앱 하나당) |
| --- | --- |
| `apps/web`, `apps/admin` — 배포 단위가 다른 앱 | `src/app` → `src/views` → `src/features` → `src/shared` |
| `packages/*` — 앱들이 공유하는 인프라 | Next `app/` 폴더는 URL만 연결하는 **얇은 진입점** |

**한 줄로 말하면:**  
“앱은 기능(feature) 단위로 나누고, 화면(view)에서 기능을 조립하며, Next 라우트와 공통 패키지는 최대한 얇게 둔다.”

**FSD(Feature-Sliced Design)와의 차이**

| | FSD (전통) | 이 프로젝트 |
| --- | --- | --- |
| 레이어 수 | app, pages, widgets, features, entities, shared 등 6~7개 | **4개** (`app`, `views`, `features`, `shared`) |
| 도메인 타입 | `entities/` 계층에 분리 | 각 `features/*/model/types.ts`에 **기능 안에 포함** |
| 화면 조립 블록 | `widgets/`, `pages/` 등 역할 분산 | `views/` 한 곳에서 화면 조립 |
| 목적 | 대규모 팀·엄격한 경계 | **초급자도 폴더를 빨리 찾을 수 있게** 단순화 |

FSD의 “기능 단위로 코드를 나눈다”는 아이디어는 가져오되, 레이어 이름과 개수를 줄인 **Pragmatic Feature-Driven** 방식이라고 보면 됩니다.

**각 계층을 이렇게 기억하면 됩니다**

```
Next app/          → "이 URL은 어떤 화면을 보여줄까?" (한 줄 re-export)
src/views/         → "이 화면에 어떤 기능 블록을 배치할까?"
src/features/      → "사용자가 하는 일 하나" (검색, 작성, 설정 저장 …)
src/shared/        → "여러 화면/기능이 같이 쓰는 설정" (routes, appShell)
packages/          → "앱 밖에서도 재사용 가능한 기술 인프라" (UI, API, Query)
```

> **왜 이렇게 나눴나요?**  
> - 기능을 찾을 때 `features/기능이름/`만 보면 됩니다.  
> - 같은 기능의 타입·훅·UI가 한 폴더에 모여 있어 수정 범위가 좁습니다.  
> - `packages/`는 “비즈니스가 아닌 공통 기술”만 두어, 앱 코드와 역할이 섞이지 않습니다.

### URL이 화면에 표시되기까지

브라우저에서 `/notice` 를 입력하면 다음 순서로 코드가 실행됩니다.

```
브라우저 /notice 접속
       → app/(main)/(board)/notice/page.tsx   → Next.js가 라우트를 찾음 (최소 진입점)
       → src/views/notice/ui/NoticePage.tsx   → 화면을 조립하는 페이지 컴포넌트
       → src/features/noticeSearch/           → 실제 검색 로직과 UI
```

### 4계층 구조

모든 앱 코드(`src/`)는 4개의 계층으로 나뉩니다.  
처음에는 "어디에 파일을 만들어야 하지?" 할 때 아래 표를 참고하세요.

| 계층 | 폴더 | 역할 / 설명 | 예시 |
| --- | --- | --- | --- |
| 1 | `src/app/` | 앱 시작 시 한 번만 세팅하는 곳 | `AppProviders` |
| 2 | `src/views/` | 특정 URL에 보이는 화면 | `NoticePage`, `QnaPage` |
| 3 | `src/features/` | 사용자가 하는 행동 하나 | 공지사항 검색, Q&A 작성 |
| 4 | `src/shared/` | 어디에나 쓰는 공통 설정/유틸 | `routes.ts` |

> **규칙:** 위 계층은 아래 계층을 가져다 쓸 수 있지만, 아래가 위를 가져다 쓰면 안 됩니다.  
> 예) `views`는 `features`를 import 할 수 있지만, `features`가 `views`를 import 하면 안 됩니다.

---

## 완전 튜토리얼 — FAQ 페이지 만들기

> "FAQ 목록 페이지"를 처음부터 직접 만들어 봅니다.  
> 이 순서를 익혀두면 어떤 페이지든 동일하게 만들 수 있습니다.

### 전체 구조 미리보기

```
만들 파일 목록
────────────────────────────────────────────
src/features/faqList/
  model/types.ts          → FAQ 타입 (데이터 모양)
  model/useFaqList.ts     → FAQ 목록 가져오기 훅
  ui/FaqListPanel.tsx     → FAQ 목록을 보여주는 컴포넌트
  index.ts                → 외부에 공개할 것만 모아두는 파일

src/views/faq/
  ui/FaqPage.tsx          → FaqListPanel을 배치하는 페이지
  index.ts

app/(main)/(board)/faq/
  page.tsx                → Next.js 라우트 연결

src/shared/config/
  routes.ts               → 탭 등록 (기존 파일 수정)
────────────────────────────────────────────
```

---

### Step 1 — feature 만들기

**feature = 사용자가 하는 행동 하나.** "FAQ 목록을 본다" 가 하나의 feature입니다.

**`src/features/faqList/model/types.ts`** — 데이터 타입 정의

```ts
// FAQ 한 건의 모양을 정의합니다.
export type Faq = {
  id: string;
  question: string;
  answer: string;
};
```

**`src/features/faqList/model/useFaqList.ts`** — 데이터 로직 (훅)

```ts
"use client";

import { useState } from "react";
import type { Faq } from "./types";

// 실제 프로젝트에서는 API 호출로 대체합니다.
const SAMPLE: Faq[] = [
  { id: "1", question: "회원가입은 어떻게 하나요?", answer: "상단 메뉴에서 가입 버튼을 누르세요." },
  { id: "2", question: "비밀번호를 잊었어요.", answer: "로그인 화면의 비밀번호 찾기를 이용하세요." },
];

export function useFaqList() {
  const [faqs] = useState<Faq[]>(SAMPLE);
  return { faqs };
}
```

**`src/features/faqList/ui/FaqListPanel.tsx`** — UI 컴포넌트

```tsx
"use client";

import { useFaqList } from "../model/useFaqList";

export function FaqListPanel() {
  const { faqs } = useFaqList();

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {faqs.map((faq) => (
        <li key={faq.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #eee" }}>
          <strong>Q. {faq.question}</strong>
          <p style={{ marginTop: "0.25rem", color: "#555" }}>A. {faq.answer}</p>
        </li>
      ))}
    </ul>
  );
}
```

**`src/features/faqList/index.ts`** — 외부 공개 API

```ts
// 이 파일에 적힌 것만 외부에서 import 할 수 있습니다.
export { FaqListPanel } from "./ui/FaqListPanel";
export { useFaqList } from "./model/useFaqList";
```

> **왜 index.ts가 필요한가요?**  
> 내부 파일 경로가 바뀌어도 외부 import 경로는 그대로 유지되어, 수정 범위가 줄어듭니다.

---

### Step 2 — page 만들기

**page = feature들을 모아 화면 하나를 구성하는 곳**

**`src/views/faq/ui/FaqPage.tsx`**

```tsx
"use client";

import { Typography } from "@repo/ui";
import { FaqListPanel } from "@/features/faqList"; // ← index.ts를 통해 import

export function FaqPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        자주 묻는 질문
      </Typography>
      <FaqListPanel />
    </main>
  );
}
```

**`src/views/faq/index.ts`**

```ts
export { FaqPage } from "./ui/FaqPage";
```

---

### Step 3 — Next.js 라우트 연결

**`app/(main)/(board)/faq/page.tsx`** 파일을 새로 만듭니다.

```tsx
// 이 파일은 한 줄입니다. Next.js에게 "이 URL에서 FaqPage를 보여줘" 라고 알려줍니다.
export { FaqPage as default } from "@/views/faq";
```

> **왜 이렇게 짧나요?**  
> 실제 화면 코드는 `src/views/faq/`에 있습니다.  
> `app/` 폴더는 URL 경로를 결정하는 역할이라, 최대한 가볍게 둡니다.

---

### Step 4 — 탭 등록

**`src/shared/config/routes.ts`** 파일에서 두 곳을 수정합니다.

```ts
// ① routes 객체에 경로 추가
export const routes = {
  home: "/",
  notice: "/notice",
  qna: "/qna",
  faq: "/faq",    // ← 추가
} as const;

// ② TAB_ROUTES에 탭 설정 추가
export const TAB_ROUTES: Record<string, TabRouteConfig> = {
  // ... 기존 탭들 ...
  [routes.faq]: {
    title: "FAQ",
    loader: () => import("@/views/faq").then((m) => ({ default: m.FaqPage })),
  },
};
```

> **왜 routes.ts 에만 추가하면 되나요?**  
> `app/(main)/layout.tsx`가 `appShellConfig.tabRoutes`(= `TAB_ROUTES`)를 읽어 탭을 자동으로 생성합니다.  
> layout.tsx 는 건드릴 필요가 없습니다. 사이드바 메뉴만 추가하려면 `appShell.ts`의 `menuItems`를 수정하세요.

---

### Step 5 — 사이드바 메뉴 추가 (선택)

사이드바 메뉴는 `src/shared/config/appShell.ts` 의 `menuItems`에 추가합니다.  
헤더/사이드바 UI는 `@repo/ui/layout/mdi-shell`이 공통으로 렌더링합니다.

```ts
// src/shared/config/appShell.ts
export const appShellConfig: AppShellConfig = {
  appId: "web",
  tabRoutes: TAB_ROUTES,
  menuItems: [
    { label: "홈", href: routes.home },
    { label: "공지사항", href: routes.notice },
    { label: "Q&A", href: routes.qna },
    { label: "FAQ", href: routes.faq }, // ← 추가
  ],
  headerTitle: "Web App",
};
```

---

### 완성 확인

`pnpm dev:web` 실행 후 브라우저에서 `/faq` 로 이동하면 FAQ 탭이 열립니다.

---

## 자주 묻는 질문 / FAQ

### Q. feature 내부 파일을 직접 import 하면 경고가 떠요.

```ts
// ❌ 내부 구조가 바뀌면 이 경로도 같이 바꿔야 합니다
import { FaqListPanel } from "@/features/faqList/ui/FaqListPanel";

// ✅ 올바름 — index.ts 를 통해 접근
import { FaqListPanel } from "@/features/faqList";
```

### Q. 새 페이지를 만드는 게 어려워요

`src/shared/config/routes.ts` 의 `TAB_ROUTES` 에 탭을 추가했는지 확인하세요.  
`app/` 폴더에 `page.tsx`를 만들면 URL은 동작하지만, 탭으로는 열리지 않습니다.

### Q. feature 폴더만 만들고 pages 폴더는 생략해도 되나요?

아닙니다. `features/` 는 기능(로직 + UI 조각)이고 `views/` 는 화면(전체 배치)입니다.  
feature가 직접 라우트에 연결되면 나중에 같은 feature를 다른 화면에서 재사용할 때 문제가 생깁니다.

### Q. @/ 로 시작하는 경로가 어디인지 모르겠어요

`tsconfig.json` 의 `paths` 설정을 확인하세요.

| import 경로 | 실제 파일 위치 |
| --- | --- |
| `@/app/...` | `src/app/...` |
| `@/views/...` | `src/views/...` |
| `@/features/...` | `src/features/...` |
| `@/shared/...` | `src/shared/...` |
| `@repo/ui` | `packages/ui` |

### Q. "use client"는 언제 붙이나요?

Next.js에서 `useState`, `useEffect` 같은 훅을 사용하는 파일에는 맨 위에 `"use client"`가 필요합니다.  
타입 정의(`types.ts`)나 순수 유틸 파일처럼 브라우저 API를 쓰지 않는 파일에는 붙이지 않아도 됩니다.

```ts
// types.ts — 타입만 있으므로 "use client" 불필요
export type Faq = { id: string; question: string; answer: string };
```

```tsx
// FaqListPanel.tsx — useState 사용 → "use client" 필요
"use client";

import { useState } from "react";
```

---

## 폴더 구조 (전체)

```
next-tanstack-monorepo/
├── apps/
│   ├── web/                        # Web 앱 (localhost:3000)
│   │   ├── app/                    # Next.js App Router 라우트 진입점
│   │   │   ├── layout.tsx          # 루트 레이아웃
│   │   │   ├── (main)/page.tsx     # / 홈
│   │   │   └── (main)/(board)/
│   │   │       ├── notice/page.tsx # /notice → 공지사항
│   │   │       └── qna/page.tsx    # /qna → Q&A
│   │   ├── src/
│   │   │   ├── app/                # 앱 영역 설정 (Provider)
│   │   │   ├── views/              # 화면 조립 (view 단위)
│   │   │   │   ├── home/
│   │   │   │   ├── notice/
│   │   │   │   └── qna/
│   │   │   ├── features/           # 기능 단위 (로직 + UI 조각)
│   │   │   └── shared/             # 공통 설정/유틸 (routes, appShell)
│   │   ├── .env.dev                 # 개발 환경 (커밋 가능)
│   │   ├── .env.prod                # 운영 환경 (커밋 가능)
│   │   ├── .env.local               # 로컬 오버라이드 (gitignore)
│   │   └── next.config.ts
│   └── admin/                      # Admin 샘플 앱 (localhost:3100)
│       ├── app/
│       │   ├── layout.tsx          # 루트 레이아웃
│       │   ├── (auth)/login/       # /login → 관리자 로그인
│       │   └── (main)/
│       │       ├── layout.tsx      # MdiMainLayout 연결
│       │       ├── page.tsx        # / → 대시보드
│       │       ├── users/page.tsx  # /users → 사용자 관리
│       │       └── settings/page.tsx # /settings → 설정
│       ├── src/
│       │   ├── app/providers/
│       │   ├── views/              # home, users, settings, login
│       │   ├── features/           # adminDashboard, userManage, adminSettings
│       │   └── shared/config/      # routes.ts, appShell.ts
│       ├── .env.dev
│       ├── .env.prod
│       ├── .env.local
│       └── next.config.ts
├── packages/                       # 공통 소프트웨어 패키지
│   ├── env/                        # 앱별 환경변수 Zod 검증
│   ├── ui/                         # 버튼, 탭, 레이아웃 등 공통 UI
│   ├── api-client/                 # Axios + Orval 생성 API
│   ├── query/                      # TanStack Query Provider
│   ├── types/                      # Zod + 공통 타입 스키마
│   └── config-typescript/          # 공통 TS 설정
├── .env.dev                        # 루트 공통 (개발)
├── .env.prod                       # 루트 공통 (운영)
├── .env.example                    # 전체 변수 계약 문서
├── pnpm-workspace.yaml
└── turbo.json
```

---

## 명명 규칙

> 파일/폴더 이름을 짓는 규칙입니다. 팀 전체가 동일하게 맞춰야 자동완성과 검색이 잘 맞습니다.

| 대상 | 규칙 | 예시 |
| ---- | ---- | ---- |
| **폴더** | camelCase (소문자로 시작) | `qnaCreate/`, `faqList/` |
| **React 컴포넌트 파일** | PascalCase (대문자 시작) | `FaqListPanel.tsx`, `AppHeader.tsx` |
| **훅 파일** | camelCase, `use` 접두사 필수 | `useFaqList.ts`, `useTabState.ts` |
| **타입/설정/유틸 파일** | camelCase | `types.ts`, `routes.ts` |
| **배럴 파일** | 항상 `index.ts` | `index.ts` |

> **배럴 파일(barrel file)이란?**  
> `index.ts`처럼 여러 파일의 export를 한 곳에 모아두는 파일입니다.  
> 외부에서는 이 파일 하나만 보고 "이 feature에서 뭘 쓸 수 있는지" 파악합니다.

```
src/features/
└── faqList/                    ← 폴더: camelCase
    ├── model/
    │   └── useFaqList.ts       ← 훅: camelCase
    ├── ui/
    │   └── FaqListPanel.tsx    ← 컴포넌트: PascalCase
    └── index.ts                ← 배럴: 항상 index.ts
```

> **왜 폴더는 케밥(`faq-list`) 이 아닌 camelCase(`faqList`)인가요?**  
> 하이픈이 있으면 일부 도구에서 따옴표 처리가 필요해 import 경로가 지저분해집니다.  
> camelCase는 JavaScript 식별자로 바로 쓸 수 있어 깔끔합니다.

---

## 새 기능 넣을 때 체크리스트

기능을 추가할 때 "어디에 만들어야 하지?" 가 헷갈리면 아래 질문을 순서대로 따라가세요.

| 질문 | 만들 곳 |
| --- | --- |
| 새 URL 화면인가요? | `app/.../page.tsx` (라우트) + `src/views/<name>/` (화면) |
| 사용자 행동 하나인가요? (검색, 작성, 삭제 등) | `src/features/<name>/` |
| 그 기능에서만 쓰는 타입인가요? | `src/features/<name>/model/types.ts` |
| 여러 feature에서 공통으로 쓰는 유틸인가요? | `src/shared/lib/<name>.ts` |
| 버튼·Input 등 범용 UI인가요? | `@repo/ui` (packages/ui) |
| API 호출 코드인가요? | `@repo/api-client` |

**실제 예시: 공지사항 검색 기능 (web)**

```
src/features/noticeSearch/
├── model/
│   ├── types.ts          → Notice 타입
│   └── useNoticeSearch.ts → 검색 훅
├── ui/
│   └── NoticeSearchPanel.tsx → 검색 UI
└── index.ts

src/views/notice/
└── ui/
    └── NoticePage.tsx    → NoticeSearchPanel 배치
```

**실제 예시: 사용자 관리 (admin)**

```
src/features/userManage/
├── model/
│   ├── types.ts           → User 타입
│   └── useUserManage.ts   → useTabState로 검색/목록 유지
├── ui/
│   └── UserManagePanel.tsx
└── index.ts

src/views/users/
└── ui/
    └── UsersPage.tsx      → UserManagePanel 배치
```

---

## Zustand — 클라이언트 상태 관리

> 참조: [https://zustand.docs.pmnd.rs/](https://zustand.docs.pmnd.rs/)

### 언제 Zustand를 쓰나요?

| 상황 | 사용할 것 |
| --- | --- |
| 컴포넌트 하나에서만 쓰는 상태 (ex: 모달 열림/닫힘) | `useState` |
| 여러 컴포넌트에서 공유하는 상태 (ex: 로그인 사용자 정보) | `Zustand` |
| 서버에서 받아오는 데이터 (ex: 공지사항 목록) | `TanStack Query` |

### Volatile vs Persistent 차이

| 구분 | Volatile (일반 스토어) | Persistent (localStorage 저장) |
| --- | --- | --- |
| 저장 위치 | 브라우저 메모리 | `localStorage` |
| 새로고침 시 | 초기값으로 리셋 | 마지막 값 그대로 복원 |
| 언제 쓰나요? | 일시 UI 상태, 모달 개폐 등 | 사용자 설정, 테마, 언어 |

---

### 패턴 1 — Volatile Store (새로고침하면 초기화)

**스토어 정의** `src/features/zustandDemo/model/volatileStore.ts`

```ts
import { create } from "zustand";

interface VolatileState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useVolatileStore = create<VolatileState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

**컴포넌트에서 사용**

```tsx
"use client";

import { useVolatileStore } from "../model/volatileStore";

export function CounterPanel() {
  // selector: 필요한 값만 꺼내서 구독합니다.
  // count가 바뀔 때만 이 컴포넌트가 리렌더링됩니다.
  const count = useVolatileStore((s) => s.count);
  const increment = useVolatileStore((s) => s.increment);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={increment}>증가</button>
    </div>
  );
}
```

> **selector란?**  
> `(s) => s.count` 처럼 스토어에서 필요한 값만 골라내는 함수입니다.  
> 스토어 전체를 구독하면 관계없는 값이 바뀌어도 리렌더링이 발생합니다.
>
> ```ts
> // ❌ 비권장 — 스토어 전체를 가져오면 count와 무관한 변경에도 리렌더링
> const store = useVolatileStore();
>
> // ✅ 권장 — count가 바뀔 때만 리렌더링
> const count = useVolatileStore((s) => s.count);
> ```

---

### 패턴 2 — Persistent Store (새로고침해도 유지)

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePersistentStore = create<VolatileState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((s) => ({ count: s.count + 1 })),
      decrement: () => set((s) => ({ count: s.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    { name: "my-store-key" }, // localStorage에 저장될 키 이름
  ),
);
```

> 브라우저 DevTools → Application → Local Storage 에서 저장된 값을 직접 확인할 수 있습니다.

### 파일 위치 기준

| 범위 | 위치 |
| --- | --- |
| 특정 feature에서만 쓰는 스토어 | `src/features/{name}/model/use{Name}Store.ts` |
| 여러 feature에서 공유하는 전역 스토어 | `src/shared/model/use{Name}Store.ts` |

### 데모 확인

홈 화면 → DemoDashboard → **"Zustand 예제"** 탭에서 두 패턴을 직접 비교할 수 있습니다.

```
src/features/zustandDemo/
├── model/
│   ├── volatileStore.ts      → 일반 스토어
│   └── persistentStore.ts   → localStorage 저장
└── ui/
    ├── ZustandDemoPanel.tsx
    ├── VolatilePanel.tsx
    └── PersistentPanel.tsx
```

---

## Zod — 런타임 스키마 검증

> 참조: [https://zod.dev/](https://zod.dev/)

### TypeScript 타입과 Zod의 차이

```
TypeScript 타입 → 코드 작성 및 컴파일 시점에만 체크합니다.
Zod 스키마     → 데이터가 실제로 실행되는 순간(런타임)에도 데이터를 검증합니다.
```

TypeScript는 "코드가 맞게 작성되었나?" 를 검사하고,  
Zod는 "서버에서 실제로 받은 데이터가 예상한 상태인가?" 를 검증합니다.

### import 방법

이 프로젝트에서는 `zod`를 `@repo/types` 를 통해 사용합니다.

```ts
// ✅ 권장
import { z } from "@repo/types";

// ❌ 비권장 (직접 import 시 버전 충돌 위험)
import { z } from "zod";
```

### 주요 사용 방법

#### safeParse vs parse

| 메서드 | 검증 실패 시 |
| --- | --- |
| `schema.parse(data)` | 예외(에러)를 던집니다 |
| `schema.safeParse(data)` | 예외 없이 `{ success: false, error }` 를 반환합니다 |

```ts
import { z } from "@repo/types";

const NoticeSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
});

// API 응답 검증 — safeParse는 실패해도 앱이 죽지 않습니다.
const result = NoticeSchema.safeParse(apiResponse);

if (result.success) {
  console.log(result.data); // 타입이 보장된 데이터
} else {
  console.error(result.error.issues); // 어떤 필드가 문제인지 목록
}
```

#### 폼 유효성 검사 (react-hook-form + Zod)

```ts
import { z } from "@repo/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FaqFormSchema = z.object({
  question: z.string().min(5, "질문은 5자 이상 입력해주세요."),
  answer: z.string().min(1, "답변을 입력해주세요."),
});

// z.infer 로 타입을 자동 추론합니다. 별도 type 선언 불필요
type FaqFormValues = z.infer<typeof FaqFormSchema>;

const { register, handleSubmit, formState: { errors } } = useForm<FaqFormValues>({
  resolver: zodResolver(FaqFormSchema),
});
```

### 스키마 파일 위치

| 범위 | 위치 |
| --- | --- |
| 특정 feature에서만 쓰는 스키마 | `src/features/{name}/model/schema.ts` |
| 여러 곳에서 공통으로 쓰는 스키마 | `packages/types/src/schemas/{name}.ts` |

---

## MDI — 탭 시스템

> 관련 파일: `packages/ui/src/layout/mdi-shell/`, `packages/ui/src/layout/mdi/`, `src/shared/config/routes.ts`, `src/shared/config/appShell.ts`, `app/(main)/layout.tsx`

화면 전환 없이 여러 페이지를 탭으로 열어 두는 시스템입니다.  
탭 목록과 활성 탭은 `localStorage`에 자동 저장되어 새로고침 후에도 복원됩니다.

### 레이아웃 연결 (앱 공통)

각 앱의 `app/(main)/layout.tsx`는 `MdiMainLayout`에 `AppShellConfig`만 주입합니다.

```tsx
"use client";

import { MdiMainLayout } from "@repo/ui/layout/mdi-shell";
import { appShellConfig } from "@/shared/config/appShell";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <MdiMainLayout config={appShellConfig}>{children}</MdiMainLayout>;
}
```

```ts
// src/shared/config/appShell.ts
import type { AppShellConfig } from "@repo/ui/layout/mdi-shell";
import { routes, TAB_ROUTES } from "./routes";

export const appShellConfig: AppShellConfig = {
  appId: "web", // admin 앱은 "admin"
  tabRoutes: TAB_ROUTES,
  menuItems: [
    { label: "홈", href: routes.home },
    { label: "공지사항", href: routes.notice },
  ],
  headerTitle: "Web App",
};
```

### 새 페이지를 탭으로 추가하는 방법

1. `src/shared/config/routes.ts` 의 `TAB_ROUTES`에 탭을 추가합니다.
2. (선택) `src/shared/config/appShell.ts` 의 `menuItems`에 사이드바 메뉴를 추가합니다.

`app/(main)/layout.tsx` 는 수정하지 않아도 자동으로 반영됩니다.

```ts
export const TAB_ROUTES: Record<string, TabRouteConfig> = {
  // 기존 탭들...

  "/faq": {
    title: "FAQ",
    loader: () => import("@/views/faq").then((m) => ({ default: m.FaqPage })),
  },
};
```

> **admin 샘플 화면:** 대시보드(`/`), 사용자 관리(`/users`), 설정(`/settings`) — 설정 탭은 `useTabState` + `useRegisterTabClose` 패턴을 사용합니다.

---

### 탭 상태 저장 — `useTabState`

#### useState와의 차이

| | `useState` | `useTabState` |
| --- | --- | --- |
| 다른 탭으로 이동(비활성) 후 돌아오면 | 초기값으로 리셋 | 이전 값 유지 |
| 탭을 닫으면 | 컴포넌트 해제 | 저장된 상태도 함께 삭제 |
| 언제 쓰나요? | 일반적인 UI 상태 | 탭 전환과 함께 유지되는 화면 입력값 |

**사용 방법** — `useState` 와 동일하게 씁니다.

```tsx
import { useTabState } from "@repo/ui/layout/mdi";

function QnaPage() {
  // useState와 같은 방식으로 사용
  // 첫 번째 인자는 탭 ID(URL 경로), 두 번째 인자는 초기값입니다.
  const [draftOpen, setDraftOpen] = useTabState("/qna", false);

  return (
    <label>
      <input
        type="checkbox"
        checked={draftOpen}
        onChange={(e) => setDraftOpen(e.target.checked)}
      />
      임시 작성 활성화
    </label>
  );
}
```

**여러 필드를 객체로 묶기 (권장)**

```tsx
interface QnaDraftForm {
  category: string;
  text: string;
}

const INITIAL: QnaDraftForm = { category: "", text: "" };

function QnaPage() {
  const [form, setForm] = useTabState<QnaDraftForm>("/qna", INITIAL);

  // 개별 필드를 바꿀 때는 함수형 업데이트를 사용합니다.
  const handleCategory = (category: string) =>
    setForm((prev) => ({ ...prev, category }));

  return (
    <select value={form.category} onChange={(e) => handleCategory(e.target.value)}>
      <option value="">카테고리 선택</option>
      <option value="bug">버그 신고</option>
    </select>
  );
}
```

---

### 탭 닫기 콜백 — `useRegisterTabClose`

사용자가 탭을 닫기 전에 "저장하지 않은 내용이 있습니다" 같은 확인 창을 띄울 수 있습니다.

| 반환값 | 동작 |
| --- | --- |
| `true` 또는 반환값 없음 | 탭을 닫습니다 |
| `false` | 닫기를 취소합니다 (탭 유지) |
| `Promise<boolean>` | 비동기 데이터로도 처리 |

> **주의:** 비활성 탭(화면에 보이지 않는 탭)에 등록된 콜백은 실행되지 않습니다.  
> 현재 활성 탭에서만 동작합니다.

```tsx
import { useTabState, useRegisterTabClose } from "@repo/ui/layout/mdi";

interface NoticeForm {
  title: string;
  content: string;
}

const INITIAL_FORM: NoticeForm = { title: "", content: "" };

export function NoticePage() {
  const [form, setForm] = useTabState<NoticeForm>("/notice", INITIAL_FORM);
  const isDirty = form.title !== "" || form.content !== "";

  // isDirty(내용이 있으면) 탭 닫기 전에 확인 창을 표시합니다.
  useRegisterTabClose("/notice", () => {
    if (!isDirty) return true;
    return window.confirm("작성 중인 내용이 있습니다. 정말 닫으시겠습니까?");
  });

  return (
    <form>
      <input
        placeholder="제목"
        value={form.title}
        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
      />
      <textarea
        placeholder="내용"
        value={form.content}
        onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
      />
      <button type="button" onClick={() => setForm(INITIAL_FORM)}>
        초기화
      </button>
    </form>
  );
}
```

### MDI 관련 파일 구조

```
packages/ui/src/layout/mdi-shell/
├── MdiMainLayout.tsx         → 앱 공통 MDI 레이아웃 (AppShellConfig 주입)
├── AppHeader.tsx             → 공통 헤더
├── AppSidebar.tsx            → 공통 사이드바
└── types.ts                  → AppShellConfig, TabRouteConfig

packages/ui/src/layout/mdi/
├── MdiTabContext.tsx         → openTab / closeTab / activateTab 로직
├── MdiTabBar.tsx             → 상단 탭 UI
├── MdiTabPanel.tsx           → 탭 내용 패널
├── useMdiTabStore.ts         → 탭 목록/활성 탭 상태 (Zustand)
├── useTabState.ts            → useTabState 훅
└── useRegisterTabClose.ts   → useRegisterTabClose 훅

src/shared/config/routes.ts   → TAB_ROUTES 등록
src/shared/config/appShell.ts → menuItems, headerTitle, appId
app/(main)/layout.tsx         → MdiMainLayout 연결 (수정 거의 불필요)
```

---

## ESLint / Prettier 설정

### 권장 VSCode 확장 프로그램

| 확장 ID                  | 이름       | 설명                                             |
| ------------------------ | ---------- | ------------------------------------------------ |
| `dbaeumer.vscode-eslint` | ESLint     | JS/TS 린팅 규칙 적용                             |
| `esbenp.prettier-vscode` | Prettier   | 코드 자동 포매팅                                 |
| `eamodio.gitlens`        | GitLens    | Git blame, 히스토리, 브랜치 등 강력한 Git 시각화 |
| `usernamehw.errorlens`   | Error Lens | 에러/경고를 해당 코드 줄에 인라인으로 표시       |

### 최초 설정 방법

#### 1. 패키지 설치

```bash
pnpm add -D prettier eslint-config-prettier
```

#### 2. `.prettierrc` (프로젝트 루트)

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "endOfLine": "lf"
}
```

#### 3. `.vscode/settings.json` (프로젝트 루트)

```json
{
  "eslint.useFlatConfig": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

> 설정 후 VSCode를 재시작하거나 `Ctrl+Shift+P` → **ESLint: Restart ESLint Server** 를 실행합니다.

---

## 주요 라이브러리 버전

| 분류                | 라이브러리                  | 버전        |
| ------------------- | ---------------------------- | ----------- |
| **런타임**          | Node.js                      | `>=20`      |
| **패키지 매니저**   | pnpm                         | `10.26.1`   |
| **빌드**            | Turbo                        | `^2.8.0`    |
| **프레임워크**      | Next.js                      | `16.1.0`    |
| **UI**              | React                        | `19.2.1`    |
| **UI 컴포넌트**     | MUI (Material UI)            | `^7.3.11`   |
| **스타일**          | Emotion React/Styled         | `^11.14.x`  |
| **서버 상태**       | TanStack Query (React Query) | `^5.100.14` |
| **HTTP 클라이언트** | Axios                        | `^1.16.1`   |
| **코드 생성**       | Orval                        | `^8.12.3`   |
| **스키마 검증**     | Zod                          | `^4.4.3`    |
| **폼**              | React Hook Form              | `^7.77.0`   |
| **차트**            | ECharts / echarts-for-react  | `^6.1.0`    |
| **클라이언트 상태** | Zustand                      | `^5.0.14`   |
| **스토리북**        | Storybook                    | `10.4.1`    |
| **언어**            | TypeScript                   | `^5.8.3`    |
| **린터**            | ESLint                       | `^9.28.0`   |
| **포매터**          | Prettier                     | `^3.8.3`    |

---

## packages 운영 규칙

`src`는 기능 중심으로 단순화하려고, `packages`는 공통 소프트웨어로 분리합니다.

| 패키지 | 역할 |
| --- | --- |
| `@repo/ui` | 버튼, 탭, 레이아웃 등 범용 UI 컴포넌트 |
| `@repo/api-client` | API 호출/인증/Orval 생성 코드 |
| `@repo/query` | TanStack Query Provider 및 공통 설정 |
| `@repo/types` | Zod + 공통 타입 스키마 |
| `@repo/typescript-config` | 모노레포 공통 TS 설정 |

**어떤 코드를 packages에 넣나요?**

- 여러 feature에서 반복적으로 재사용되는 코드
- 다른 프로젝트나 다른 앱에서도 쓸 수 있는 코드

**어떤 코드는 packages에 넣지 않나요?**

- 특정 도메인(공지사항, Q&A 등)에서만 쓰는 타입  
  → `src/features/<name>/model/types.ts` 에 둡니다.
- 화면/기능에 종속된 API 매핑 로직  
  → `src/features/<name>/api/` 에 둡니다.
