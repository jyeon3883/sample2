"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from "@repo/ui";
import { QNA_CATEGORY_OPTIONS } from "@/features/qnaCreate";
import { useQnaForm } from "../model/useQnaForm";

export function QnaCreateForm() {
  const { form, isDirty, handleText, handleCategory, handleReset } = useQnaForm();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxWidth: 480 }}>
      {/* 카테고리 select */}
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
          카테고리
        </Typography>
        <Select
          size="small"
          fullWidth
          displayEmpty
          value={form.category}
          onChange={(e) => handleCategory(e.target.value)}
        >
          {QNA_CATEGORY_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value} disabled={opt.value === ""}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* 질문 내용 textarea */}
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
          질문 내용
        </Typography>
        <textarea
          rows={5}
          placeholder="질문 내용을 입력하세요..."
          value={form.text}
          onChange={(e) => handleText(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "0.9rem",
            border: "1px solid #ccc",
            borderRadius: 4,
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
      </Box>

      {/* useTabState 저장값 확인 패널 */}
      <Box
        sx={{
          p: 1.5,
          bgcolor: "grey.100",
          borderRadius: 1,
          border: "1px dashed",
          borderColor: "grey.400",
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
          useTabState 저장값 (다른 탭 이동 후 복귀해도 유지됨)
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            size="small"
            label={`카테고리: ${form.category || "(미선택)"}`}
            color={form.category ? "primary" : "default"}
            variant="outlined"
          />
          <Chip
            size="small"
            label={`내용: ${form.text ? `"${form.text.slice(0, 20)}${form.text.length > 20 ? "…" : ""}"` : "(비어있음)"}`}
            color={form.text ? "primary" : "default"}
            variant="outlined"
          />
        </Box>
      </Box>

      {isDirty && (
        <Typography variant="caption" color="warning.main">
          저장되지 않은 내용이 있습니다. 탭을 닫으면 확인 창이 표시됩니다.
        </Typography>
      )}

      <Button
        variant="outlined"
        size="small"
        onClick={handleReset}
        disabled={!isDirty}
        sx={{ alignSelf: "flex-start" }}
      >
        초기화
      </Button>
    </Box>
  );
}
