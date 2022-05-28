import { useMutation } from 'react-query'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useLoginContext } from '../context/LoginContext'
import { LoginForm, LoginValues } from '../components/LoginForm'

const LoginPage: NextPage = () => {
    const router = useRouter()
    const user = useLoginContext()

    if (user) router.push('/')

    return (
        <div className="w-full flex flex-col justify-center items-center mt-4">
            <LoginForm />
        </div>
    )
}

export default LoginPage
