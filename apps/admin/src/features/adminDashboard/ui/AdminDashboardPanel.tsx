"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import { Typography } from "@repo/ui";
import { ACTIVITY_LOGS, DASHBOARD_STATS, RECENT_USERS } from "../model/sampleData";
import type { DashboardStat } from "../model/types";

function StatCard({ label, value, trend, color }: DashboardStat) {
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

export function AdminDashboardPanel() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {DASHBOARD_STATS.map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Tabs value={tab} onChange={(_, nextTab) => setTab(nextTab)}>
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
              {RECENT_USERS.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status === "active" ? "활성" : "비활성"}
                      size="small"
                      color={user.status === "active" ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>{user.date}</TableCell>
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
              {ACTIVITY_LOGS.map((log, index) => (
                <TableRow key={index} hover>
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
