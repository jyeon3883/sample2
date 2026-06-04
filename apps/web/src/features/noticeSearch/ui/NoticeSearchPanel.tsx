"use client";

import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@repo/ui";
import { useNoticeSearch } from "../model/useNoticeSearch";

export function NoticeSearchPanel() {
  const { keyword, notices, totalCount, matchCount, setKeyword, resetKeyword } =
    useNoticeSearch();

  return (
    <Box sx={{ mt: 2, maxWidth: 560 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          size="small"
          fullWidth
          label="공지 검색"
          placeholder="제목으로 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="outlined" onClick={resetKeyword} disabled={keyword.length === 0}>
          초기화
        </Button>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
        전체 {totalCount}건 중 {matchCount}건 표시
      </Typography>

      <Box component="ul" sx={{ mt: 1.5, mb: 0, pl: 2.5 }}>
        {notices.map((notice) => (
          <li key={notice.id}>
            <Typography variant="body2">
              {notice.title} ({notice.createdAt})
            </Typography>
          </li>
        ))}
      </Box>
    </Box>
  );
}
