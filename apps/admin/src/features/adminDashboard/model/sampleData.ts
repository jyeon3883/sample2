import type { ActivityLog, DashboardStat, RecentUser } from "./types";

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: "전체 사용자", value: "1,284", trend: "+12%", color: "#1976d2" },
  { label: "오늘 접속", value: "87", trend: "+5%", color: "#2e7d32" },
  { label: "대기 중 요청", value: "14", trend: "-3%", color: "#ed6c02" },
  { label: "시스템 알림", value: "3", trend: "0%", color: "#9c27b0" },
];

export const RECENT_USERS: RecentUser[] = [
  { id: 1, name: "김민준", email: "minjun@example.com", role: "Admin", status: "active", date: "2026-06-01" },
  { id: 2, name: "이서연", email: "seoyeon@example.com", role: "Editor", status: "active", date: "2026-05-30" },
  { id: 3, name: "박지호", email: "jiho@example.com", role: "Viewer", status: "inactive", date: "2026-05-29" },
  { id: 4, name: "최아름", email: "areum@example.com", role: "Editor", status: "active", date: "2026-05-28" },
  { id: 5, name: "정우진", email: "woojin@example.com", role: "Viewer", status: "inactive", date: "2026-05-27" },
];

export const ACTIVITY_LOGS: ActivityLog[] = [
  { time: "14:32", user: "김민준", action: "사용자 권한 변경", target: "이서연" },
  { time: "13:15", user: "이서연", action: "공지사항 등록", target: "운영 공지 #42" },
  { time: "11:48", user: "박지호", action: "로그인 시도 실패", target: "3회 연속" },
  { time: "10:05", user: "최아름", action: "설정 변경", target: "API Key 갱신" },
];
