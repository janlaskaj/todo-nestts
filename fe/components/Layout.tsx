import React from 'react'
import { Header } from './Header'

type Props = {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => (
    <div className="h-screen min-w-full bg-amber-200 flex flex-col">
        <Header />
        {children}
    </div>
)
