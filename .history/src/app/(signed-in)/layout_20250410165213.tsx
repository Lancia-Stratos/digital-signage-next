import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


// export default function SignedInLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <>
//       <SidebarProvider>

//         <AppSidebar />
//         <main>
//           <SidebarTrigger />
//           {/* このchildrenは、localhost:3000/ のページ */}
//           {children}
//         </main>

//       </SidebarProvider>

//     </>)
// }

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>

      <AppSidebar />
      <main>
        <SidebarTrigger />
        {/* このchildrenは、localhost:3000/ のページ */}
        {children}
      </main>

    </SidebarProvider>
  )
}