"use client";

import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@repo/ui";

export function AdminLoginPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
        Admin 로그인
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: -1, mb: 1 }}>
        관리자 계정으로 로그인하세요
      </Typography>
      <TextField label="아이디" size="small" fullWidth />
      <TextField label="비밀번호" type="password" size="small" fullWidth />
      <Button variant="contained" fullWidth>
        로그인
      </Button>
    </Box>
  );
}
