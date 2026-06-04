"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "@repo/types";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { Button, TextField, Typography } from "@repo/ui";

const UserFormSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요.").max(20, "20자 이내로 입력해주세요."),
  email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
  role: z.enum(["Admin", "Editor", "Viewer"], { message: "역할을 선택해주세요." }),
});

type UserFormValues = z.infer<typeof UserFormSchema>;

export function FormPanel() {
  const [submitted, setSubmitted] = useState<UserFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: { name: "", email: "", role: "Viewer" },
  });

  function onSubmit(values: UserFormValues) {
    setSubmitted(values);
  }

  return (
    <Box sx={{ display: "grid", gap: 2, maxWidth: 480 }}>
      <Typography variant="body2" color="text.secondary">
        react-hook-form + zodResolver 조합으로 폼 유효성을 검사합니다.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "grid", gap: 2 }}
        noValidate
      >
        <TextField
          label="이름"
          size="small"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="이메일"
          size="small"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="역할"
          size="small"
          select
          defaultValue="Viewer"
          {...register("role")}
          error={!!errors.role}
          helperText={errors.role?.message}
          SelectProps={{ native: true }}
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </TextField>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button type="submit">등록</Button>
          <Button onClick={() => { reset(); setSubmitted(null); }}>초기화</Button>
        </Box>
      </Box>

      {submitted && (
        <Alert severity="success">
          <strong>제출 성공!</strong>
          <pre style={{ margin: "8px 0 0", fontSize: "0.8rem" }}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </Alert>
      )}
    </Box>
  );
}
