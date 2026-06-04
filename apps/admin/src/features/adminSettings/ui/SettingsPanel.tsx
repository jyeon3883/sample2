"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { Button, TextField, Typography } from "@repo/ui";
import { useAdminSettings } from "../model/useAdminSettings";

export function SettingsPanel() {
  const { form, isDirty, saved, updateField, handleSave, handleReset, dismissSaved } =
    useAdminSettings();

  return (
    <>
      <Stack spacing={3} sx={{ maxWidth: 600 }}>
        <Paper variant="outlined">
          <Box sx={{ p: 2, bgcolor: "grey.50" }}>
            <Typography variant="subtitle1" fontWeight={600}>
              일반 설정
            </Typography>
          </Box>
          <Divider />
          <CardContent component={Stack} spacing={2}>
            <TextField
              label="사이트 이름"
              size="small"
              fullWidth
              value={form.siteName}
              onChange={(e) => updateField("siteName", e.target.value)}
            />
            <Box>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                언어
              </Typography>
              <Select
                size="small"
                fullWidth
                value={form.language}
                onChange={(e) => updateField("language", e.target.value)}
              >
                <MenuItem value="ko">한국어</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ja">日本語</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                타임존
              </Typography>
              <Select
                size="small"
                fullWidth
                value={form.timezone}
                onChange={(e) => updateField("timezone", e.target.value)}
              >
                <MenuItem value="Asia/Seoul">Asia/Seoul (UTC+9)</MenuItem>
                <MenuItem value="UTC">UTC</MenuItem>
                <MenuItem value="America/New_York">America/New_York (UTC-5)</MenuItem>
              </Select>
            </Box>
          </CardContent>
        </Paper>

        <Paper variant="outlined">
          <Box sx={{ p: 2, bgcolor: "grey.50" }}>
            <Typography variant="subtitle1" fontWeight={600}>
              알림 설정
            </Typography>
          </Box>
          <Divider />
          <CardContent>
            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.emailNotify}
                    onChange={(e) => updateField("emailNotify", e.target.checked)}
                  />
                }
                label="이메일 알림"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={form.smsNotify}
                    onChange={(e) => updateField("smsNotify", e.target.checked)}
                  />
                }
                label="SMS 알림"
              />
            </Stack>
          </CardContent>
        </Paper>

        <Paper variant="outlined">
          <Box sx={{ p: 2, bgcolor: "warning.50" }}>
            <Typography variant="subtitle1" fontWeight={600} color="warning.main">
              고급 설정
            </Typography>
          </Box>
          <Divider />
          <CardContent>
            <FormControlLabel
              control={
                <Switch
                  checked={form.maintenanceMode}
                  onChange={(e) => updateField("maintenanceMode", e.target.checked)}
                  color="warning"
                />
              }
              label={
                <Box>
                  <Typography variant="body2">점검 모드</Typography>
                  <Typography variant="caption" color="text.secondary">
                    활성화 시 일반 사용자 접근이 차단됩니다
                  </Typography>
                </Box>
              }
            />
          </CardContent>
        </Paper>

        {isDirty && (
          <Typography variant="caption" color="warning.main">
            저장되지 않은 변경이 있습니다. 탭을 닫으면 확인 창이 표시됩니다.
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={handleSave}>
            저장
          </Button>
          <Button variant="outlined" onClick={handleReset} disabled={!isDirty}>
            초기화
          </Button>
        </Box>
      </Stack>

      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={dismissSaved}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={dismissSaved}>
          설정이 저장되었습니다.
        </Alert>
      </Snackbar>
    </>
  );
}
