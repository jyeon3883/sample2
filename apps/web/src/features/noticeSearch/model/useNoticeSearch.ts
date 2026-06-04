"use client";

import { useMemo, useState } from "react";
import type { Notice } from "./types";

const SAMPLE_NOTICES: Notice[] = [
  { id: "n-001", title: "서비스 점검 안내", createdAt: "2026-06-01" },
  { id: "n-002", title: "신규 기능 배포 공지", createdAt: "2026-05-29" },
  { id: "n-003", title: "Q&A 작성 가이드 업데이트", createdAt: "2026-05-26" },
  { id: "n-004", title: "로그인 정책 변경 안내", createdAt: "2026-05-20" },
];

export interface UseNoticeSearchReturn {
  keyword: string;
  notices: Notice[];
  totalCount: number;
  matchCount: number;
  setKeyword: (value: string) => void;
  resetKeyword: () => void;
}

export function useNoticeSearch(): UseNoticeSearchReturn {
  const [keyword, setKeyword] = useState("");
  const normalizedKeyword = keyword.trim().toLowerCase();

  const notices = useMemo(() => {
    if (!normalizedKeyword) return SAMPLE_NOTICES;
    return SAMPLE_NOTICES.filter((notice) =>
      notice.title.toLowerCase().includes(normalizedKeyword),
    );
  }, [normalizedKeyword]);

  return {
    keyword,
    notices,
    totalCount: SAMPLE_NOTICES.length,
    matchCount: notices.length,
    setKeyword,
    resetKeyword: () => setKeyword(""),
  };
}
