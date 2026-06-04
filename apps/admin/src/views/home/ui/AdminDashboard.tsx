"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const stats = [
  { label: "전체 사용자", value: "1,284", trend: "+12%", color: "#1976d2" },
  { label: "오늘 접속", value: "87", trend: "+5%", color: "#2e7d32" },
  { label: "대기 중 요청", value: "14", trend: "-3%", color: "#ed6c02" },
  { label: "시스템 알림", value: "3", trend: "0%", color: "#9c27b0" },
];

const recentUsers = [
  { id: 1, name: "김민준", email: "minjun@example.com", role: "Admin", status: "active", date: "2026-06-01" },
  { id: 2, name: "이서연", email: "seoyeon@example.com", role: "Editor", status: "active", date: "2026-05-30" },
  { id: 3, name: "박지호", email: "jiho@example.com", role: "Viewer", status: "inactive", date: "2026-05-29" },
  { id: 4, name: "최아름", email: "areum@example.com", role: "Editor", status: "active", date: "2026-05-28" },
  { id: 5, name: "정우진", email: "woojin@example.com", role: "Viewer", status: "inactive", date: "2026-05-27" },
];

const recentLogs = [
  { time: "14:32", user: "김민준", action: "사용자 권한 변경", target: "이서연" },
  { time: "13:15", user: "이서연", action: "공지사항 등록", target: "운영 공지 #42" },
  { time: "11:48", user: "박지호", action: "로그인 시도 실패", target: "3회 연속" },
  { time: "10:05", user: "최아름", action: "설정 변경", target: "API Key 갱신" },
];

function StatCard({ label, value, trend, color }: { label: string; value: string; trend: string; color: string }) {
  const isPositive = trend.startsWith("+");
  const isNeutral = trend === "0%";
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h4" fontWeight={700} sx={{ color }}>
          {value}
        </Typography>
        <Chip
          label={trend}
          size="small"
          sx={{
            mt: 1,
            bgcolor: isNeutral ? "grey.100" : isPositive ? "success.50" : "error.50",
            color: isNeutral ? "text.secondary" : isPositive ? "success.main" : "error.main",
            fontWeight: 600,
          }}
        />
      </CardContent>
    </Card>
  );
}

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
}

export function AdminDashboard() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((s) => (
          <Grid key={s.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard {...s} />
          </Grid>
        ))}
      </Grid>

      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="최근 사용자" />
        <Tab label="활동 로그" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell>이름</TableCell>
                <TableCell>이메일</TableCell>
                <TableCell>역할</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>가입일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentUsers.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={u.status === "active" ? "활성" : "비활성"}
                      size="small"
                      color={u.status === "active" ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>{u.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell>시각</TableCell>
                <TableCell>사용자</TableCell>
                <TableCell>액션</TableCell>
                <TableCell>대상</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentLogs.map((log, i) => (
                <TableRow key={i} hover>
                  <TableCell sx={{ color: "text.secondary", fontSize: "0.75rem" }}>{log.time}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>{log.target}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  );
}
