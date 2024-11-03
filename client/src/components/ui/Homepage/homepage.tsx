'use client'

import * as React from 'react'
import { Moon, Sun, Home, Settings, User, MessageSquare, Menu, Search, Plus } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarInset,
} from '@/components/ui/sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'

const chatList = [
    { id: 1, name: 'Alice Johnson', message: 'Hey, how are you doing?', time: '2m ago', unread: 2 },
    { id: 2, name: 'Bob Smith', message: 'Can we schedule a meeting?', time: '1h ago', unread: 0 },
    {
        id: 3, name: 'Carol Williams', message: 'I ve sent the report.', time: '3h ago', unread: 1
    },
    { id: 4, name: 'David Brown', message: 'Thanks for your help!', time: '1d ago', unread: 0 },
]

export default function HomePage() {
    const [activeTab, setActiveTab] = React.useState('home')
    const { setTheme, theme } = useTheme()

    const handleThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <SidebarProvider>
            <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
                <Sidebar className="w-64 border-r flex-shrink-0">
                    <SidebarHeader className="bg-gradient-to-r from-primary to-primary-foreground p-4">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" className="w-full justify-start text-background">
                                    <MessageSquare className="mr-2 h-5 w-5" />
                                    <span className="font-bold text-xl">Buzz Chat</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent className="flex flex-col h-[calc(100vh-64px)]">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveTab('home')} isActive={activeTab === 'home'}>
                                    <Home className="mr-2 h-4 w-4" />
                                    Home
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveTab('settings')} isActive={activeTab === 'settings'}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveTab('profile')} isActive={activeTab === 'profile'}>
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <div className="mt-4 px-4 flex-grow overflow-hidden">
                            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Recent Chats</h3>
                            <ScrollArea className="h-full">
                                {chatList.map((chat) => (
                                    <div key={chat.id} className="flex items-center space-x-4 py-2 hover:bg-accent rounded-lg px-2 cursor-pointer">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${chat.name}`} />
                                            <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{chat.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{chat.message}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                                            {chat.unread > 0 && (
                                                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                                                    {chat.unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    </SidebarContent>
                </Sidebar>
                <SidebarInset className="flex flex-col flex-grow overflow-hidden">
                    <header className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-[300px] pl-8"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Switch
                                checked={theme === 'dark'}
                                onCheckedChange={handleThemeChange}
                                className="data-[state=checked]:bg-primary"
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
                                            <AvatarFallback>UN</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <main className="flex-grow p-6 overflow-auto">
                        {activeTab === 'home' && (
                            <div className="space-y-6 h-full">
                                <h1 className="text-3xl font-bold">Welcome back, User!</h1>
                                {/* Nội dung chính của trang chính */}
                            </div>
                        )}
                        {activeTab === 'settings' && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Settings</h2>
                                <p>Customize your Buzz Chat experience here.</p>
                                {/* Add more settings options here */}
                            </div>
                        )}
                        {activeTab === 'profile' && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Your Profile</h2>
                                <p>Manage your personal information and preferences.</p>
                                {/* Add more profile options here */}
                            </div>
                        )}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
