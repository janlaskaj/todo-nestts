import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button } from './Button'
import { useMutation, useQuery } from 'react-query'
import {
    useLoginContext,
    User,
    useSetLoginContext,
} from '../context/LoginContext'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'

export type LoginValues = {
    email: string
    password: string
}

type Props = {}

export const LoginForm: React.FC<Props> = () => {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const user = useLoginContext()
    const setUser = useSetLoginContext()

    const { mutate, data } = useMutation(
        (values: LoginValues) => {
            return fetch('http://127.0.0.1:4000/auth/signin', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(values),
            })
        },
        {
            onSuccess: async (data) => {
                const response: { access_token?: string; message?: string } =
                    await data.json()

                if (response.access_token) {
                    const user: User = jwt_decode(response.access_token)
                    setUser(user)
                }

                if (response.message) {
                    setError(response.message)
                }
            },
        }
    )

    if (user) router.push('/')

    return (
        <Formik<LoginValues>
            initialValues={{
                email: 'jan@laskaj.com',
                password: '12345',
            }}
            onSubmit={(values) => {
                mutate(values)
            }}
        >
            <Form className="flex flex-col mt-4 p-4 gap-4 shadow-xl">
                {error && <span className="text-red-500">{error}</span>}
                <label htmlFor="email">Email</label>
                <Field
                    id="email"
                    name="email"
                    placeholder="email"
                    className="border-2 p-1"
                />

                <label htmlFor="password">Password</label>
                <Field
                    id="password"
                    name="password"
                    placeholder="password"
                    className="border-2 p-1"
                />
                <Button text="Submit" type="submit" />
            </Form>
        </Formik>
    )
}
