"use client"
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
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Crown, Home, Heart, MessageCircle, User, Settings, Shield, LogOut } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { setUser } from "@/store/userSlice"
import { UseDispatch } from "react-redux"
const navigationItems = [
  {
    title: "Discover",
    url: "/home",
    icon: Home,
  },
  {
    title: "Matches",
    url: "/matches",
    icon: Heart,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageCircle,
  },
  {
    title: "Profile",
    url: "/profile/me",
    icon: User,
  },
]

const settingsItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Privacy",
    url: "/privacy",
    icon: Shield,
  },
]

export function AppSidebar() {
  const router =useRouter();
  const dispatch = useDispatch();
  const handleLogout=async()=>{
    try {
      console.log("clicked on logout");
      
      const val = await fetch('http://localhost:3000/api/auth/logout',{
        method :'POST',
      });
      const res  = await val.json();
      if(res.success) {
        toast.success('Logout success');
        dispatch( setUser(null));
       
        router.push('./login')
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  const {user} = useSelector((state:any)=>state.profile);
  return (
    <Sidebar className="border-amber-200">
      <SidebarHeader className="border-b border-amber-200 bg-gradient-to-r from-amber-50 to-red-50">
        <div className="flex items-center gap-3 px-2 py-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
              KshatriyaKonnect
            </h1>
            <p className="text-xs text-amber-600">Royal Connections</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-700 font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-amber-50 hover:text-amber-700">
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-amber-200" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-700 font-semibold">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-amber-50 hover:text-amber-700">
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-amber-200 bg-gradient-to-r from-amber-50 to-red-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-3">
              <Avatar className="w-10 h-10 border-2 border-amber-300">
                <AvatarFallback className="bg-gradient-to-br from-amber-600 to-red-700 text-white font-semibold">
                  {user?.firstname.slice(0,1) + user?.lastname.slice(0,1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.firstname+" "+user?.lastname}</p>
                <p className="text-xs text-amber-600 truncate">Gotra : {user?.gotra}</p>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="hover:bg-red-50 hover:text-red-700 text-red-600">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
