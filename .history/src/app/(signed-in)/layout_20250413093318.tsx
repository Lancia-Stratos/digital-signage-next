import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


// サイバーの状態をCookieに保存できるように変更
// https://ui.shadcn.com/docs/components/sidebar

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={{ "--sidebar-width": "10rem", "--sidebar-width-mobile": "10rem" } as any}
    >

      <AppSidebar />
      <main>
        <SidebarTrigger />
        {/* このchildrenは、localhost:3000/ のページ */}
        {children}
      </main>

    </SidebarProvider>
  )
}


// ここから下は、Cookieに保存しない場合のコード

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