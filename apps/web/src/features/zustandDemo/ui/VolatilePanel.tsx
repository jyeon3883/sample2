"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import { Button, Typography } from "@repo/ui";
import { useVolatileStore } from "../model/volatileStore";

export function VolatilePanel() {
  const { count, message, increment, decrement, reset, setMessage } =
    useVolatileStore();

  return (
    <Box sx={{ maxWidth: 480, mt: 2 }}>
      <Alert severity="warning" sx={{ mb: 3 }}>
        이 상태는 <strong>브라우저 메모리에만</strong> 저장됩니다. 페이지를
        새로고침하면 초기값(count: 0, message: "")으로 돌아옵니다.
      </Alert>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        현재 상태
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <Chip label={`count: ${count}`} color="default" variant="outlined" />
        <Chip
          label={`message: "${message || "(없음)"}"`}
          color="default"
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
        새로고침 후 이 필드는 비워집니다.
      </Typography>
    </Box>
  );
}
