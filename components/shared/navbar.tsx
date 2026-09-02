"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, UserRound, Settings, LogOut } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/service/logout"

import { toast } from "sonner"

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact us", href: "/contact" },
  { label: "News", href: "/news" },
  { label: "Premium", href: "/premium" },
  
]



type IUser = {
    success:boolean,
    message:string,
    data:{
        user:{
            id:string,
            name:string,
            email:string,
            activeStatus:string,
            role:string,
            createdAt:string,
            updatedAt:string,
            profile:{
                id:string,
                userId:string,
                profilePhoto:null | string,
                bio:null | string,
                createdAt:string,
                updatedAt:string
            }
        }
    }


}

type NavbarProps ={
  user:IUser | null;
}

export default  function NavigationBar({user}:NavbarProps)  {

const router = useRouter();
const handleLogout = async () => {
  try {
    await logout();
    
    
      toast.success("User logged out successfully");
      // Redirect to the login page after successful logout
      router.push("/login");
  } catch (error) {

    toast.error("Failed to logout");
  }
};


  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-950"
          aria-label="FixITNow home"
        >
          FixitNow<span className="text-indigo-600">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Mobile Menu Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Profile Dropdown */}
         {user?.success ? ( <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Avatar className="h-8 w-8 border border-slate-200">
                  <AvatarFallback className="bg-slate-100 text-slate-600">
                    <UserRound className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64"
            >
              {/* User Information */}
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold text-slate-950">
                   {user?.data?.user?.name ?? "User"}
                  </p>

                  <p className="text-xs text-slate-500">
                    {user?.data?.user?.email ?? "No email available"}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* Profile */}
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="cursor-pointer"
                >
                  <UserRound className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              {/* Settings */}
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              {/* Logout */}
              <DropdownMenuItem
              
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={() => handleLogout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem> 

            </DropdownMenuContent>
          </DropdownMenu>) :
          <Link href="/auth/login" className="text-sm font-medium text-slate-700 hover:text-slate-900 px-4 py-2 rounded hover:bg-slate-100 ">
            Login
          </Link>
          }

        </div>
      </nav>
    </header>
  )
}
