"use client";

import Box from "@mui/material/Box";
import { Typography } from "@repo/ui";
import { AdminDashboardPanel } from "@/features/adminDashboard";

export function AdminHomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <Typography variant="h4" fontWeight={700}>
        대시보드
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        관리자 현황을 한 눈에 확인할 수 있습니다.
      </Typography>
      <Box>
        <AdminDashboardPanel />
      </Box>
    </main>
  );
}
