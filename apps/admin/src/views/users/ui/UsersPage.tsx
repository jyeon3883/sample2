"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "active" | "inactive";
  createdAt: string;
};

const initialUsers: User[] = [
  { id: 1, name: "김민준", email: "minjun@example.com", role: "Admin", status: "active", createdAt: "2026-01-10" },
  { id: 2, name: "이서연", email: "seoyeon@example.com", role: "Editor", status: "active", createdAt: "2026-02-14" },
  { id: 3, name: "박지호", email: "jiho@example.com", role: "Viewer", status: "inactive", createdAt: "2026-03-01" },
  { id: 4, name: "최아름", email: "areum@example.com", role: "Editor", status: "active", createdAt: "2026-03-22" },
  { id: 5, name: "정우진", email: "woojin@example.com", role: "Viewer", status: "inactive", createdAt: "2026-04-05" },
  { id: 6, name: "한지민", email: "jimin@example.com", role: "Viewer", status: "active", createdAt: "2026-04-18" },
  { id: 7, name: "윤성호", email: "sungho@example.com", role: "Editor", status: "active", createdAt: "2026-05-03" },
];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<User | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.includes(search) || u.email.includes(search);
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  function handleEditOpen(user: User) {
    setEditTarget({ ...user });
    setDialogOpen(true);
  }

  function handleEditSave() {
    if (!editTarget) return;
    setUsers((prev) => prev.map((u) => (u.id === editTarget.id ? editTarget : u)));
    setDialogOpen(false);
    setEditTarget(null);
  }

  function handleToggleStatus(id: number) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u,
      ),
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        사용자 관리
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="이름 또는 이메일 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 240 }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>역할 필터</InputLabel>
          <Select
            label="역할 필터"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="Viewer">Viewer</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ flex: 1 }} />
        <Typography variant="body2" color="text.secondary" sx={{ alignSelf: "center" }}>
          {filtered.length}명
        </Typography>
      </Stack>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell>이름</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>역할</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>가입일</TableCell>
              <TableCell align="center">액션</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((u) => (
              <TableRow key={u.id} hover>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <Chip
                    label={u.status === "active" ? "활성" : "비활성"}
                    size="small"
                    color={u.status === "active" ? "success" : "default"}
                    onClick={() => handleToggleStatus(u.id)}
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
                <TableCell>{u.createdAt}</TableCell>
                <TableCell align="center">
                  <Button size="small" onClick={() => handleEditOpen(u)}>
                    편집
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3, color: "text.secondary" }}>
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>사용자 편집</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="이름"
              size="small"
              fullWidth
              value={editTarget?.name ?? ""}
              onChange={(e) => setEditTarget((p) => p && { ...p, name: e.target.value })}
            />
            <TextField
              label="이메일"
              size="small"
              fullWidth
              value={editTarget?.email ?? ""}
              onChange={(e) => setEditTarget((p) => p && { ...p, email: e.target.value })}
            />
            <FormControl size="small" fullWidth>
              <InputLabel>역할</InputLabel>
              <Select
                label="역할"
                value={editTarget?.role ?? "Viewer"}
                onChange={(e) =>
                  setEditTarget((p) => p && { ...p, role: e.target.value as User["role"] })
                }
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="Viewer">Viewer</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>취소</Button>
          <Button variant="contained" onClick={handleEditSave}>
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
