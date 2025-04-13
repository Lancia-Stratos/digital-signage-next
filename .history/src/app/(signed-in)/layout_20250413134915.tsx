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
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    //折りたたみ可能な状態を処理 サイドバーの幅を10remに設定
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={{
        "--sidebar-width": "11rem",
        "--sidebar-width-mobile": "11rem"
      } as CSSProperties & CustomProperties}
    >

      {/* サイドバーのコンテナ */}
      <AppSidebar />
      <main className="flex-grow">
        {/* サイドバーを開閉するボタン */}
        <div className="flex w-full">
          <SidebarTrigger />
          {/* このchildrenは、localhost:3000/(signed-in)/page.tsx のページ */}
          <div className="ml-2 flex-grow">
            <div className="bg-gray-100 min-h-screen w-full">
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