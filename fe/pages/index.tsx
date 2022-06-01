import type { NextPage } from 'next'
import Link from 'next/link'
import { useLoginContext } from '../context/LoginContext'
import { useQuery } from 'react-query'
import Error from 'next/error'
import { TodoList } from '../components/TodoList'

export type Todo = {
    id: number
    userId: number
    title: string
    description: string
    done: boolean
}

const Home: NextPage = () => {
    const user = useLoginContext()

    const { data, error, refetch } = useQuery<Todo[], Error>(
        'todos',
        async () => {
            if (!user)
                return new Error({
                    title: 'User not logged in',
                    statusCode: 401,
                })

            const response = await fetch('http://127.0.0.1:4000/todo', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            })
            if (!response.ok) {
                throw new Error({
                    title: 'Network response was not ok',
                    statusCode: response.status,
                })
            }
            return response.json()
        }
    )

    if (!user)
        return (
            <Link href="/login">
                <a className="my-6 cursor-pointer text-gray-400 underline transition-all hover:text-lg hover:text-gray-500">
                    you need to be logged in to use the app...
                </a>
            </Link>
        )

    if (error) return <span>{Error.name}</span>

    if (!data) return <span>loading...</span>

    return <>{data.length > 0 && <TodoList todos={data} refetch={refetch} />}</>
}

export default Home
