import { Typography } from "@repo/ui";
import { UserManagePanel } from "@/features/userManage";

export function UsersPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        사용자 관리
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        검색/필터 값은 다른 탭으로 이동했다가 돌아와도 유지됩니다.
      </Typography>
      <UserManagePanel />
    </main>
  );
}
