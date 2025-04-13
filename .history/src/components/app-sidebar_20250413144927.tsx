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
    SidebarTrigger
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
                <SidebarHeader className="flex items-center justify-between py-2 px-3">
                    {/* サイドバーのタイトルとトリガーボタンを同じ行に配置 */}
                    <SidebarGroupLabel className="group-data-[collapsible=icon]:opacity-100">
                        {String(metadata.title)}
                    </SidebarGroupLabel>

                    <SidebarTrigger className="!opacity-100 inline-flex" />
                </SidebarHeader>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="">
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

