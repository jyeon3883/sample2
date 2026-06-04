export type UserRole = "Admin" | "Editor" | "Viewer";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  createdAt: string;
};

export type UserManageFilter = {
  search: string;
  roleFilter: string;
};

export type UserManageState = UserManageFilter & {
  users: User[];
};

export const INITIAL_USERS: User[] = [
  { id: 1, name: "김민준", email: "minjun@example.com", role: "Admin", status: "active", createdAt: "2026-01-10" },
  { id: 2, name: "이서연", email: "seoyeon@example.com", role: "Editor", status: "active", createdAt: "2026-02-14" },
  { id: 3, name: "박지호", email: "jiho@example.com", role: "Viewer", status: "inactive", createdAt: "2026-03-01" },
  { id: 4, name: "최아름", email: "areum@example.com", role: "Editor", status: "active", createdAt: "2026-03-22" },
  { id: 5, name: "정우진", email: "woojin@example.com", role: "Viewer", status: "inactive", createdAt: "2026-04-05" },
  { id: 6, name: "한지민", email: "jimin@example.com", role: "Viewer", status: "active", createdAt: "2026-04-18" },
  { id: 7, name: "윤성호", email: "sungho@example.com", role: "Editor", status: "active", createdAt: "2026-05-03" },
];

export const INITIAL_USER_MANAGE_STATE: UserManageState = {
  search: "",
  roleFilter: "all",
  users: INITIAL_USERS,
};
