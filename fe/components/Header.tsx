import { useRouter } from 'next/router'
import Link from 'next/link'
import { useLoginContext, useSetLoginContext } from '../context/LoginContext'

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
            <img
                alt="svgImg"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBmaWxsPSIjMTg1YWJkIiBkPSJNMjQuNDgsMjkuMzE2bC05LjUwNSw5LjUwNUwxLjU4OCwyNS40MzRjLTAuNzg0LTAuNzg0LTAuNzg0LTIuMDU0LDAtMi44MzhsNi42NjctNi42NjcJYzAuNzg0LTAuNzg0LDIuMDU0LTAuNzg0LDIuODM4LDBMMjQuNDgsMjkuMzE2eiI+PC9wYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0iNXFLQWN5ZGN0VmIzaGtHVDI3amh3YV9IcFBxQ3F5bm90VnBfZ3IxIiB4MT0iMTQuNTcyIiB4Mj0iNDMuMTg4IiB5MT0iMzguMTk5IiB5Mj0iOS41ODMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0MTkxZmQiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1NWFjZmQiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxwYXRoIGZpbGw9InVybCgjNXFLQWN5ZGN0VmIzaGtHVDI3amh3YV9IcFBxQ3F5bm90VnBfZ3IxKSIgZD0iTTE3Ljc5Nyw0MS42NDJsLTYuNjY3LTYuNjY3Yy0wLjc4NC0wLjc4NC0wLjc4NC0yLjA1NCwwLTIuODM4TDM2LjkwNyw2LjM1OAljMC43ODQtMC43ODQsMi4wNTQtMC43ODQsMi44MzgsMGw2LjY2Nyw2LjY2N2MwLjc4NCwwLjc4NCwwLjc4NCwyLjA1NCwwLDIuODM4TDIwLjYzNCw0MS42NDIJQzE5Ljg1MSw0Mi40MjUsMTguNTgsNDIuNDI1LDE3Ljc5Nyw0MS42NDJ6Ij48L3BhdGg+PC9zdmc+"
            />
            <Link href="/">
                <a className="font-bold text-2xl text-fuchsia-600">ToDos</a>
            </Link>
            <div className="flex-grow" />
            {user ? (
                <>
                    <span>{user.email}</span>
                    <button
                        className="px-4 py-2 rounded bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors text-white font-bold"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <Link href="/login">
                    <a className="px-4 py-2 rounded bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors text-white font-bold">
                        Login
                    </a>
                </Link>
            )}
        </header>
    )
}
