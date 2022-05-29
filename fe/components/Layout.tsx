import React from 'react'
import { Header } from './Header'

type Props = {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => (
    <div className="h-screen min-w-full flex flex-col">
        <Header />
        <div className="flex flex-col w-full items-center">{children}</div>
    </div>
)
