"use client";

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
import { TextField, Typography } from "@repo/ui";
import { useUserManage } from "../model/useUserManage";
import type { UserRole } from "../model/types";

export function UserManagePanel() {
  const {
    filteredUsers,
    search,
    roleFilter,
    dialogOpen,
    editTarget,
    setSearch,
    setRoleFilter,
    handleEditOpen,
    handleEditSave,
    handleEditClose,
    handleEditTargetChange,
    handleToggleStatus,
  } = useUserManage();

  return (
    <>
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
          {filteredUsers.length}명
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
            {filteredUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status === "active" ? "활성" : "비활성"}
                    size="small"
                    color={user.status === "active" ? "success" : "default"}
                    onClick={() => handleToggleStatus(user.id)}
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell align="center">
                  <Button size="small" onClick={() => handleEditOpen(user)}>
                    편집
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3, color: "text.secondary" }}>
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleEditClose} maxWidth="xs" fullWidth>
        <DialogTitle>사용자 편집</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="이름"
              size="small"
              fullWidth
              value={editTarget?.name ?? ""}
              onChange={(e) => handleEditTargetChange({ name: e.target.value })}
            />
            <TextField
              label="이메일"
              size="small"
              fullWidth
              value={editTarget?.email ?? ""}
              onChange={(e) => handleEditTargetChange({ email: e.target.value })}
            />
            <FormControl size="small" fullWidth>
              <InputLabel>역할</InputLabel>
              <Select
                label="역할"
                value={editTarget?.role ?? "Viewer"}
                onChange={(e) =>
                  handleEditTargetChange({ role: e.target.value as UserRole })
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
          <Button onClick={handleEditClose}>취소</Button>
          <Button variant="contained" onClick={handleEditSave}>
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
