import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ClerkProvider } from "@clerk/nextjs";

import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Zdrowitek",
  description: "A Next.js 14 Meta application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Topbar/>
          <main className='flex flex-row'>
            <LeftSidebar/>
              <section className='main-container'>
                <div className="w-full max-w-4xl">
                 {children}
                </div>
              </section>
            <RightSidebar/>
          </main>
        <Bottombar/>
      </body>
    </html>
   </ClerkProvider>
  )
}
