import React, { useContext, useState } from 'react'

export type User = {
    sub: number
    email: string
    iat: number
    exp: number
    token: string
}

const LoginContext = React.createContext<User | null>(null)
const SetLoginContext = React.createContext<
    React.Dispatch<React.SetStateAction<User | null>>
>({} as any)

export const useLoginContext = () => useContext(LoginContext)
export const useSetLoginContext = () => useContext(SetLoginContext)

export const LoginProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [login, setLogin] = useState<User | null>(null)

    return (
        <LoginContext.Provider value={login}>
            <SetLoginContext.Provider value={setLogin}>
                {children}
            </SetLoginContext.Provider>
        </LoginContext.Provider>
    )
}
