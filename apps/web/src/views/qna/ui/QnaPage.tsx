"use client";

import Box from "@mui/material/Box";
import { Typography } from "@repo/ui";
import { QnaCreateForm } from "@/features/qnaCreate";

export function QnaPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <Typography variant="h4" component="h1">
        Q&amp;A
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
        값을 입력 후 다른 탭으로 이동했다가 돌아오면 상태가 유지됩니다.
      </Typography>

      <Box>
        <QnaCreateForm />
      </Box>
    </main>
  );
}
