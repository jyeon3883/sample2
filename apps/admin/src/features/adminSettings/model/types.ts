export type SettingsFormState = {
  siteName: string;
  language: string;
  timezone: string;
  emailNotify: boolean;
  smsNotify: boolean;
  maintenanceMode: boolean;
};

export const INITIAL_SETTINGS: SettingsFormState = {
  siteName: "Admin Console",
  language: "ko",
  timezone: "Asia/Seoul",
  emailNotify: true,
  smsNotify: false,
  maintenanceMode: false,
};

export function isSettingsDirty(
  form: SettingsFormState,
  baseline: SettingsFormState = INITIAL_SETTINGS,
): boolean {
  return (
    form.siteName !== baseline.siteName ||
    form.language !== baseline.language ||
    form.timezone !== baseline.timezone ||
    form.emailNotify !== baseline.emailNotify ||
    form.smsNotify !== baseline.smsNotify ||
    form.maintenanceMode !== baseline.maintenanceMode
  );
}
