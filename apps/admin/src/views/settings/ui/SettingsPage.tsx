"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export function SettingsPage() {
  const [siteName, setSiteName] = useState("Admin Console");
  const [language, setLanguage] = useState("ko");
  const [timezone, setTimezone] = useState("Asia/Seoul");
  const [emailNotify, setEmailNotify] = useState(true);
  const [smsNotify, setSmsNotify] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
  }

  return (
    <main style={{ padding: "2rem" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        설정
      </Typography>

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
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
            <Box>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                언어
              </Typography>
              <Select
                size="small"
                fullWidth
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
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
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
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
                    checked={emailNotify}
                    onChange={(e) => setEmailNotify(e.target.checked)}
                  />
                }
                label="이메일 알림"
              />
              <FormControlLabel
                control={
                  <Switch checked={smsNotify} onChange={(e) => setSmsNotify(e.target.checked)} />
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
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
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

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={handleSave}>
            저장
          </Button>
          <Button variant="outlined" onClick={() => setSaved(false)}>
            초기화
          </Button>
        </Box>
      </Stack>

      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={() => setSaved(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSaved(false)}>
          설정이 저장되었습니다.
        </Alert>
      </Snackbar>
    </main>
  );
}
