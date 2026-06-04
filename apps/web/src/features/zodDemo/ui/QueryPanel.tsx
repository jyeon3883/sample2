"use client";

import { useState } from "react";
import { z } from "@repo/types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import { Button, Typography } from "@repo/ui";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["Admin", "Editor", "Viewer"]),
  active: z.boolean(),
});

type User = z.infer<typeof UserSchema>;

const UsersResponseSchema = z.object({
  data: z.array(UserSchema),
  total: z.number(),
});

const MOCK_VALID_RESPONSE = {
  data: [
    { id: 1, name: "Kim", email: "kim@example.com", role: "Admin", active: true },
    { id: 2, name: "Lee", email: "lee@example.com", role: "Editor", active: true },
    { id: 3, name: "Park", email: "park@example.com", role: "Viewer", active: false },
  ],
  total: 3,
};

const MOCK_INVALID_RESPONSE = {
  data: [
    { id: 1, name: "Kim", email: "not-an-email", role: "Unknown", active: "yes" },
    { id: 2, name: 999, email: "lee@example.com", role: "Editor", active: true },
  ],
  total: "two",
};

export function QueryPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleFetch(valid: boolean) {
    setParseError(null);
    setUsers([]);
    setStatus("idle");

    const raw = valid ? MOCK_VALID_RESPONSE : MOCK_INVALID_RESPONSE;
    const result = UsersResponseSchema.safeParse(raw);

    if (result.success) {
      setUsers(result.data.data);
      setStatus("success");
    } else {
      const messages = result.error.issues
        .map((e) => `[${e.path.join(".")}] ${e.message}`)
        .join("\n");
      setParseError(messages);
      setStatus("error");
    }
  }

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Mock API 응답을 Zod 스키마로 파싱합니다. 정상/비정상 응답으로 런타임 검증을 확인하세요.
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button onClick={() => handleFetch(true)}>정상 응답 파싱</Button>
        <Button onClick={() => handleFetch(false)}>비정상 응답 파싱</Button>
      </Box>

      {status === "success" && (
        <>
          <Alert severity="success">파싱 성공 — {users.length}건</Alert>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>이메일</TableCell>
                  <TableCell>역할</TableCell>
                  <TableCell>활성</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.id}</TableCell>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={u.role}
                        size="small"
                        color={u.role === "Admin" ? "error" : u.role === "Editor" ? "warning" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={u.active ? "활성" : "비활성"}
                        size="small"
                        color={u.active ? "success" : "default"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {status === "error" && (
        <Alert severity="error" sx={{ whiteSpace: "pre-wrap" }}>
          <strong>파싱 실패 — Zod 오류 내역:</strong>
          {"\n"}
          {parseError}
        </Alert>
      )}
    </Box>
  );
}
