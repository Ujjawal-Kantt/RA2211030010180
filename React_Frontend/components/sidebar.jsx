"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Users, TrendingUp, Activity, Menu, X } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Top Users", path: "/top-users", icon: <Users className="h-5 w-5" /> },
    { name: "Trending Posts", path: "/trending-posts", icon: <TrendingUp className="h-5 w-5" /> },
    { name: "Live Feed", path: "/live-feed", icon: <Activity className="h-5 w-5" /> },
  ]

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary/10 p-2 rounded-full backdrop-blur-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <motion.aside
        className={`fixed md:relative z-40 h-full bg-black/40 backdrop-blur-xl border-r border-white/10 
                    md:w-64 w-64 transition-all duration-300 ease-in-out ${isOpen ? "left-0" : "-left-64 md:left-0"}`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col h-full p-4">
          <div className="py-6 px-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              SocialPulse
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Analytics Dashboard</p>
          </div>

          <nav className="space-y-2 mt-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <motion.div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                            ${
                              pathname === item.path
                                ? "bg-primary/20 text-primary border-l-4 border-primary"
                                : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                            }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {pathname === item.path && (
                    <motion.div className="absolute right-4 h-2 w-2 rounded-full bg-primary" layoutId="navIndicator" />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <p className="text-xs text-muted-foreground">Social Media Analytics Dashboard v1.0</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

