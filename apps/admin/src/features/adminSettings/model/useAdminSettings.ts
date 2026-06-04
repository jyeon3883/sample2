"use client";

import { useState } from "react";
import { useRegisterTabClose, useTabState } from "@repo/ui/layout/mdi";
import { routes } from "@/shared/config/routes";
import { INITIAL_SETTINGS, isSettingsDirty, type SettingsFormState } from "./types";

export interface UseAdminSettingsReturn {
  form: SettingsFormState;
  isDirty: boolean;
  saved: boolean;
  updateField: <K extends keyof SettingsFormState>(key: K, value: SettingsFormState[K]) => void;
  handleSave: () => void;
  handleReset: () => void;
  dismissSaved: () => void;
}

/**
 * 설정 폼 상태 훅.
 * - useTabState: 탭 전환 후에도 입력값 유지
 * - useRegisterTabClose: 변경 내용이 있을 때 탭 닫기 전 확인
 */
export function useAdminSettings(): UseAdminSettingsReturn {
  const [form, setForm] = useTabState<SettingsFormState>(routes.settings, INITIAL_SETTINGS);
  const [saved, setSaved] = useState(false);
  const isDirty = isSettingsDirty(form);

  const updateField = <K extends keyof SettingsFormState>(
    key: K,
    value: SettingsFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => setSaved(true);

  const handleReset = () => {
    setForm(INITIAL_SETTINGS);
    setSaved(false);
  };

  useRegisterTabClose(routes.settings, () => {
    if (!isDirty) return true;
    return window.confirm("저장하지 않은 설정 변경이 있습니다. 탭을 닫으시겠습니까?");
  });

  return {
    form,
    isDirty,
    saved,
    updateField,
    handleSave,
    handleReset,
    dismissSaved: () => setSaved(false),
  };
}
