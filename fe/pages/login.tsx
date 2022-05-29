import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useLoginContext } from '../context/LoginContext'
import { LoginForm, LoginValues } from '../components/LoginForm'

const LoginPage: NextPage = () => {
    const router = useRouter()
    const user = useLoginContext()

    if (user) router.push('/')

    return (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
            <LoginForm />
        </div>
    )
}

export default LoginPage
