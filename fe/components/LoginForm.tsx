import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button } from './Button'
import { useMutation } from 'react-query'
import {
    useLoginContext,
    User,
    useSetLoginContext,
} from '../context/LoginContext'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'
import Error from 'next/error'

export type LoginValues = {
    email: string
    password: string
}

export const LoginForm: React.FC = () => {
    const router = useRouter()
    const user = useLoginContext()
    const setUser = useSetLoginContext()

    const { mutate, error } = useMutation<
        Response,
        Error | undefined,
        LoginValues
    >(
        (values) => {
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
                const response: {
                    message?: string
                    access_token?: string
                } = await data.json()

                if (response.access_token) {
                    const user: Pick<User, 'sub' | 'email' | 'iat' | 'exp'> =
                        jwt_decode(response.access_token)
                    setUser({ ...user, token: response.access_token })
                } else if (response.message) {
                    throw new Error({
                        title: response.message,
                        statusCode: data.status,
                    })
                } else {
                    throw new Error({
                        title: 'An error occurred.',
                        statusCode: data.status,
                    })
                }

                return response
            },
        }
    )

    if (user) router.push('/')

    return (
        <Formik<LoginValues>
            initialValues={{
                email: 'jan@laskaj.com',
                password: '1234',
            }}
            onSubmit={(values) => {
                mutate(values)
            }}
        >
            <Form className="flex flex-col mt-4 p-4 gap-4 shadow-xl">
                {error && (
                    <span className="text-red-600">{error.props.title}</span>
                )}
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
