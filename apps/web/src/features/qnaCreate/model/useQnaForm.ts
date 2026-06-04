"use client";

import { useTabState, useRegisterTabClose } from "@repo/ui/layout/mdi";
import { type QnaFormState, INITIAL_QNA_FORM } from "./types";
import { routes } from "@/shared/config/routes";

export interface UseQnaFormReturn {
  form: QnaFormState;
  isDirty: boolean;
  handleText: (value: string) => void;
  handleCategory: (value: string) => void;
  handleReset: () => void;
}

/**
 * Q&A 작성 폼 상태 훅.
 *
 * - useTabState: 탭 전환(언마운트) 후 복귀해도 입력값 유지, 탭 닫기 시 자동 삭제
 * - useRegisterTabClose: 입력값이 있을 때 탭 닫기 전 확인 다이얼로그 표시
 */
export function useQnaForm(): UseQnaFormReturn {
  const [form, setForm] = useTabState<QnaFormState>(routes.qna, INITIAL_QNA_FORM);

  const isDirty = form.text.trim().length > 0 || form.category !== "";

  const handleText = (value: string) =>
    setForm((prev) => ({ ...prev, text: value }));

  const handleCategory = (value: string) =>
    setForm((prev) => ({ ...prev, category: value }));

  const handleReset = () => setForm(INITIAL_QNA_FORM);

  useRegisterTabClose(routes.qna, () => {
    if (!isDirty) return true;
    return window.confirm(
      "작성 중인 내용이 있습니다.\n탭을 닫으면 내용이 사라집니다. 닫으시겠습니까?",
    );
  });

  return { form, isDirty, handleText, handleCategory, handleReset };
}
