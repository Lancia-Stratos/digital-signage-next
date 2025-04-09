import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


export default function SignedInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <body>{children}</body>

  )
}
