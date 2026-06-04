import { LoginLayout } from "@repo/ui/layout/login-layout";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <LoginLayout>{children}</LoginLayout>;
}
