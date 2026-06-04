"use client";

import { Typography } from "@repo/ui";
import { TextField, Button } from "@repo/ui";
import Box from "@mui/material/Box";

export function LoginPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        로그인
      </Typography>
      <TextField label="아이디" size="small" fullWidth />
      <TextField label="비밀번호" type="password" size="small" fullWidth />
      <Button variant="contained" fullWidth>
        로그인
      </Button>
    </Box>
  );
}
