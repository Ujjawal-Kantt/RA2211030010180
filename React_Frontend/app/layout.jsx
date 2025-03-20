import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Social Media Analytics",
  description: "A modern social media analytics dashboard",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex min-h-screen bg-gradient-to-br from-background to-background/90">
            <Sidebar />
            <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'