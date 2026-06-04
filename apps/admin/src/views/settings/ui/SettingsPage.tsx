import { Typography } from "@repo/ui";
import { SettingsPanel } from "@/features/adminSettings";

export function SettingsPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        설정
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        변경 내용은 탭 전환 후에도 유지되며, 저장하지 않고 탭을 닫으면 확인 창이 표시됩니다.
      </Typography>
      <SettingsPanel />
    </main>
  );
}
