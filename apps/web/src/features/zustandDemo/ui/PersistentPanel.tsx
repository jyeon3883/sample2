"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import { Button, Typography } from "@repo/ui";
import { usePersistentStore } from "../model/persistentStore";

const STORAGE_KEY = "zustand-demo-persistent";

export function PersistentPanel() {
  const { count, message, increment, decrement, reset, setMessage } =
    usePersistentStore();

  const rawValue =
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

  return (
    <Box sx={{ maxWidth: 480, mt: 2 }}>
      <Alert severity="success" sx={{ mb: 3 }}>
        이 상태는 <strong>localStorage</strong>에 자동으로 저장됩니다 (키:{" "}
        <code>{STORAGE_KEY}</code>). 페이지를 새로고침해도 마지막 값이
        유지됩니다.
      </Alert>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        현재 상태
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <Chip label={`count: ${count}`} color="primary" variant="outlined" />
        <Chip
          label={`message: "${message || "(없음)"}"`}
          color="primary"
          variant="outlined"
          sx={{ maxWidth: 240, overflow: "hidden" }}
        />
      </Stack>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        카운터 조작
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Button variant="contained" size="small" onClick={increment}>
          + 증가
        </Button>
        <Button variant="outlined" size="small" onClick={decrement}>
          - 감소
        </Button>
        <Button variant="outlined" size="small" color="error" onClick={reset}>
          초기화
        </Button>
      </Stack>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        메시지 입력
      </Typography>
      <TextField
        size="small"
        fullWidth
        placeholder="값을 입력하고 새로고침해 보세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mb: 1 }}
      />
      <Typography variant="caption" color="text.disabled">
        새로고침 후에도 이 필드의 값이 복원됩니다.
      </Typography>

      {rawValue && (
        <Box
          sx={{
            mt: 3,
            p: 1.5,
            bgcolor: "grey.50",
            borderRadius: 1,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
            localStorage 저장값 (raw JSON)
          </Typography>
          <Typography
            variant="caption"
            component="pre"
            sx={{ m: 0, whiteSpace: "pre-wrap", wordBreak: "break-all", fontSize: "0.7rem" }}
          >
            {rawValue}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
