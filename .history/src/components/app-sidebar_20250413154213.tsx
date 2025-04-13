import { Calendar, Home, Ruler, Search, Settings } from "lucide-react"
import { SignedIn, UserButton } from "@clerk/nextjs"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { metadata } from "@/app/layout"
// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "単位",
        url: "/unit",
        icon: Ruler,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>

                <SidebarHeader className="ml-0.5">
                    {/* サイドバーのタイトル*/}
                    <SidebarGroupLabel>
                        {String(metadata.title)}
                    </SidebarGroupLabel>

                    {/* サイドバーの開閉ボタン*/}
                    <div className="flex items-center"></div>
                    <SidebarTrigger />
                    <p className="group-data-[collapsible=icon]:hidden">TEST</p>
                </SidebarHeader>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="">
                            {/* メニューのアイテム*/}
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* ログインしている時はユーザーアイコンを表示 */}
                <div className="mt-auto ml-2 mb-20">
                    <SidebarFooter>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </SidebarFooter>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}

