"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Icon } from "@/lib/icons"

export function ThemeSwitch() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="border boder-border rounded-md p-1 cursor-pointer" onClick={() => setTheme(theme === "dark" ? 'light' : 'dark')}>
        <Icon name={theme === 'dark' ? 'Moon' : 'Sun' as any} className='w-5 h-5' />
        </div>

    )
}
