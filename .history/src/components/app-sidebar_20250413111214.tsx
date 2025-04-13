import { Calendar, Home, Ruler, Search, Settings } from "lucide-react"
import { SignedIn, UserButton } from "@clerk/nextjs"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter
} from "@/components/ui/sidebar"

type AppSidebarProps = {
    title: string;
}

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

export function AppSidebar({ title }: AppSidebarProps) {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent></SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>{title}</SidebarGroupLabel>
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
        </Sidebar >
    )
}

