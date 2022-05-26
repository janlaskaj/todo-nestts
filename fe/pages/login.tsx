import { NextPage } from 'next'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useLoginContext } from '../context/LoginContext'

const LoginPage: NextPage = () => {
    const [email, setEmail] = useState('jan@laskaj.com')
    const [password, setPassword] = useState('1234')
    const { mutate, error } = useLogin(email, password)
    const user = useLoginContext()

    if (user)
        return (
            <ul>
                <li>{user.sub}</li>
                <li>{user.email}</li>
            </ul>
        )

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type={'submit'}
                onClick={() => {
                    mutate()
                }}
            >
                Submit
            </button>
        </form>
    )
}

export default LoginPage
