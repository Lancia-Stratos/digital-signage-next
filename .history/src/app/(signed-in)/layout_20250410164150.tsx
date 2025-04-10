import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


export default function SignedInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SidebarProvider
        style={{
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        }}>

        <AppSidebar />
        <main>
          <SidebarTrigger />
          {/* このchildrenは、localhost:3000/ のページ */}
          {children}
        </main>

      </SidebarProvider>

    </>)
}
