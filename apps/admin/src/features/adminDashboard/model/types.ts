export type DashboardStat = {
  label: string;
  value: string;
  trend: string;
  color: string;
};

export type RecentUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  date: string;
};

export type ActivityLog = {
  time: string;
  user: string;
  action: string;
  target: string;
};
