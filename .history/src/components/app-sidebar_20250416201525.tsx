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
        <Sidebar collapsible="icon" className="ml-0.5">
            <SidebarContent>

                <SidebarHeader className="">
                    {/* サイドバーのタイトル*/}
                    <SidebarGroupLabel
                        className="
    opacity-0
    group-data-[collapsible=expanded]:opacity-100 
    group-data-[collapsible=expanded]:delay-300
    transition-opacity
    duration-300
"
                    >
                        {String(metadata.title)}
                    </SidebarGroupLabel>

                    {/* サイドバーの開閉ボタン*/}
                    <div className="flex items-center">
                        <SidebarTrigger />
                        <p className="text-[13px] group-data-[collapsible=icon]:hidden">Sidebar</p>
                    </div>
                </SidebarHeader>

                {/* サイドバーの区切り線*/}
                <SidebarSeparator />

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
                <div className="mt-auto">
                    <SidebarFooter>
                        <div className="mt-auto mb-20 flex items-center w-full">
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </SidebarFooter>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}

