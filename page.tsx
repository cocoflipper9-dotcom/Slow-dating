'use client'

import { useState } from 'react'
import { BottomNav, type TabId } from '@/components/bottom-nav'
import { TabView } from '@/components/tab-view'

export default function Page() {
  const [active, setActive] = useState<TabId>('accueil')

  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-background sm:p-6">
      {/* Smartphone-format PWA surface: full screen on mobile, framed on desktop */}
      <div className="relative flex h-svh w-full max-w-[420px] flex-col overflow-hidden bg-background sm:h-[860px] sm:rounded-[2.5rem] sm:border sm:border-border sm:shadow-2xl sm:shadow-black/40">
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <TabView tab={active} />
        </div>
        <BottomNav active={active} onChange={setActive} />
      </div>
    </main>
  )
}
