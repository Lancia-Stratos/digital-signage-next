"use client"

import { cn } from "@/lib/utils"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HomeIcon, LayoutDashboardIcon, MonitorIcon, SettingsIcon } from "lucide-react"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="border-b p-4">
                <h2 className="text-lg font-semibold">デジタルサイネージ</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>メニュー</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="ホーム">
                                    <HomeIcon className="h-4 w-4 mr-2" />
                                    <span>ホーム</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="ダッシュボード">
                                    <LayoutDashboardIcon className="h-4 w-4 mr-2" />
                                    <span>ダッシュボード</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="デバイス">
                                    <MonitorIcon className="h-4 w-4 mr-2" />
                                    <span>デバイス</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="設定">
                            <SettingsIcon className="h-4 w-4 mr-2" />
                            <span>設定</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
} 