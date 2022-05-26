import { NextPage } from 'next'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useLoginContext } from '../context/LoginContext'
import { useRouter } from 'next/router'

const LoginPage: NextPage = () => {
    const [email, setEmail] = useState('jan@laskaj.com')
    const [password, setPassword] = useState('1234')
    const router = useRouter()
    const { mutate, data, error, isLoading }: any = useLogin(email, password)
    const user = useLoginContext()

    if (user) router.push('/')

    if (isLoading) return <span>loading...</span>

    return (
        <div className="w-full flex flex-col justify-center items-center mt-4">
            {error && <span className="text-red-600">error</span>}
            {data?.message && (
                <span className="text-red-600">{data?.message}</span>
            )}
            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col mt-4 p-4 gap-4 shadow-xl"
            >
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 p-1"
                />
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2 p-1"
                />
                <button
                    type={'submit'}
                    onClick={() => {
                        mutate()
                    }}
                    className="border-2 p-1"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default LoginPage