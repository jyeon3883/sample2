export type QnaPost = {
  id: string;
  title: string;
  createdAt: string;
};

export interface QnaFormState {
  text: string;
  category: string;
}

export const INITIAL_QNA_FORM: QnaFormState = { text: "", category: "" };

export const QNA_CATEGORY_OPTIONS = [
  { value: "", label: "카테고리 선택" },
  { value: "bug", label: "버그 제보" },
  { value: "feature", label: "기능 요청" },
  { value: "general", label: "일반 문의" },
] as const;
