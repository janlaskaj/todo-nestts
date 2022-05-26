import { useMutation } from 'react-query'
import jwt_decode from 'jwt-decode'
import { User, useSetLoginContext } from '../context/LoginContext'

export const useLogin = (email: string, password: string) => {
    const setLogin = useSetLoginContext()

    const { mutate, error } = useMutation(async () => {
        try {
            const res = await fetch('http://127.0.0.1:4000/auth/signin', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ email, password }),
            })

            const body: { access_token: string } = await res.json()
            const user = jwt_decode<User>(body.access_token)

            setLogin(user)
        } catch (e) {
            return e
        }
    })

    return { mutate, error }
}
