import { Typography } from "@repo/ui";
import { NoticeSearchPanel } from "@/features/noticeSearch";

export function NoticePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <Typography variant="h4" component="h1">
        공지사항
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        notice domain · API 연동은 이후 추가
      </Typography>
      <NoticeSearchPanel />
    </main>
  );
}
