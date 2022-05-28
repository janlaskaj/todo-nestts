import type { NextPage } from 'next'
import { useLoginContext } from '../context/LoginContext'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type Todo = {
    id: number
    userId: number
    title: string
    description: string
    done: boolean
}

const Home: NextPage = () => {
    const router = useRouter()
    const user = useLoginContext()
    const { data, error } = useQuery<Todo[]>('todos', async () => {
        if (!user) return new Error('User not logged in')
        const response = await fetch('http://127.0.0.1:4000/todo', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        })
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json()
    })

    console.log(error)
    console.log(data)

    if (error) return <span>{}</span>

    // useEffect(() => {
    //     if (!user) {
    //         router.push('/login')
    //     }
    // }, [user])

    return <div></div>
}

export default Home
