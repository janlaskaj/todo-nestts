import { useRouter } from 'next/router'
import Link from 'next/link'
import { useLoginContext, useSetLoginContext } from '../context/LoginContext'
import { Button } from './Button'
import { Logo } from './Logo'

export const Header = () => {
    const router = useRouter()
    const user = useLoginContext()
    const setUser = useSetLoginContext()

    const handleLogout = () => {
        setUser(null)
        router.push('/login')
    }

    return (
        <header className="flex p-2 gap-4 items-center border-b border-fuchsia-300 shadow-lg">
            <Logo />
            <Link href="/">
                <a className="font-bold text-2xl text-fuchsia-600">ToDos</a>
            </Link>
            <div className="flex-grow" />
            {user ? (
                <>
                    <span>{user.email}</span>
                    <Button text="Logout" onClick={handleLogout} />
                </>
            ) : (
                <Button
                    text="Login"
                    onClick={() => {
                        router.push('/login')
                    }}
                />
            )}
        </header>
    )
}
