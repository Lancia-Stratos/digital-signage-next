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
    SidebarSeparator,
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
        url: "/units",
        icon: Ruler,
    },
    {
        title: "単位保存テスト",
        url: "/units/addTest",
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
        <Sidebar collapsible="icon" className="h-screen">
            <SidebarContent className="h-full flex flex-col">
                <SidebarHeader className="ml-0.5">
                    <div className="flex items-center">
                        {/* サイドバーの開閉ボタン */}
                        <SidebarTrigger />
                        {/* サイドバーのタイトル */}
                        <SidebarGroupLabel className="!ml-0.5 !pl-0">
                            {String(metadata.title)}
                        </SidebarGroupLabel>
                    </div>

                </SidebarHeader>

                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupContent className="flex-1 overflow-y-auto">
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

                <SidebarFooter className="mb-20">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </SidebarFooter>
            </SidebarContent >
        </Sidebar >
    )
}

