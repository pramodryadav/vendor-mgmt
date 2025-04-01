'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet";
import { Home, Users, LogOut, Menu } from 'lucide-react';



export default function Sidebar() {
  const pathname = usePathname() // Get the current route
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile Sidebar (Drawer) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>

          <button className="absolute p-2 md:hidden">
            <Menu className="w-6 h-6" />
          </button>


        </SheetTrigger>
        <SheetContent aria-describedby={undefined} side="left" className="w-64">
          <VisuallyHidden>
            <SheetTitle>Hidden Title</SheetTitle>
          </VisuallyHidden>
          {/* Sidebar Content */}
          <aside className={` w-64`}>
            <nav className="overflow-y-auto space-y-2 bg-white dark:bg-gray-800 h-screen pt-11 pb-10 px-4 transition-colors duration-300">
              <Link href="/dashboard">
                <div className={` text-gray-900 dark:text-gray-100 cursor-pointer flex items-center my-1 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${pathname === "/dashboard" ? "bg-gray-200 dark:bg-gray-700" : ""}`}>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </div>
              </Link>

              <Link href="/vendors">
                <div className={`text-gray-900 dark:text-gray-100 cursor-pointer flex items-center my-1 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${pathname === "/vendors" ? "bg-gray-200 dark:bg-gray-700" : ""}`}>
                  <Users className="mr-2 h-4 w-4" />
                  Vendors
                </div>
              </Link>

            </nav>

            <div className="absolute bottom-4 p-4">
              <Link href="/logout">
                <div className="cursor-pointer flex items-center p-2 rounded-md text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </div>
              </Link>
            </div>
          </aside>
        </SheetContent>
      </Sheet>

      <aside className={`hidden md:block w-64`}>
        <nav className="overflow-y-auto space-y-2 bg-white dark:bg-gray-800 h-screen   p-4 transition-colors duration-300">
          <Link href="/dashboard">
            <div className={` text-gray-900 dark:text-gray-100 cursor-pointer flex items-center my-1 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${pathname === "/dashboard" ? "bg-gray-200 dark:bg-gray-700" : ""}`}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </div>
          </Link>

          <Link href="/vendors">
            <div className={`text-gray-900 dark:text-gray-100 cursor-pointer flex items-center my-1 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${pathname === "/vendors" ? "bg-gray-200 dark:bg-gray-700" : ""}`}>
              <Users className="mr-2 h-4 w-4" />
              Vendors
            </div>
          </Link>

        </nav>

        <div className="absolute bottom-4 p-4">
          <Link href="/logout">
            <div className="cursor-pointer flex items-center p-2 rounded-md text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </div>
          </Link>
        </div>
      </aside>
    </>
  )
}
