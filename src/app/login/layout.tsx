import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to machi-mise with your phone number. まちの店にサインイン。",
  robots: { index: false },
}

export default function LoginLayout({ children }: LayoutProps<'/login'>) {
  return <>{children}</>
}
