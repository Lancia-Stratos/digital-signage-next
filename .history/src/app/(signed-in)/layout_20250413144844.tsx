import { cookies } from "next/headers"
import { CSSProperties } from "react"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

type CustomProperties = {
  "--sidebar-width": string;
  "--sidebar-width-mobile": string;
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  // サイドバーの状態をCookieに保存できる処理
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "false"

  return (
    //折りたたみ可能な状態を処理
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={{
        //サイドバーの幅を設定
        "--sidebar-width": "15rem",
        "--sidebar-width-mobile": "15rem"
      } as CSSProperties & CustomProperties}
    >

      {/* サイドバーのコンテナ */}
      <AppSidebar />
      <main className="w-full h-full">
        {/* サイドバーを開閉するボタン */}
        <div className="flex bg-gray-100 min-h-screen w-full">
          {/* サイドバーを開閉するボタン */}
          <SidebarTrigger />
          {/* このchildrenは、localhost:3000/(signed-in)/page.tsx のページ */}
          <div className="ml-2">
            <div className="">
              {children}
            </div>
          </div>
        </div>
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