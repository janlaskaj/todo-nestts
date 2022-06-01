import React from 'react'
import { useRouter } from 'next/router'
import { useLoginContext } from '../context/LoginContext'
import { Field, Form, Formik } from 'formik'
import { Button } from './Button'
import { QueryClient, useMutation } from 'react-query'

type TodoForm = {
    title: string
    description: string
}

export const TodoForm: React.FC<{ refetch: any }> = ({ refetch }) => {
    const user = useLoginContext()

    const { mutate } = useMutation<Response, Error, TodoForm>(
        (values) => {
            return fetch('http://127.0.0.1:4000/todo', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
                method: 'POST',
                body: JSON.stringify(values),
            })
        },
        {
            onSuccess: async () => {
                refetch()
            },
        }
    )

    return (
        <Formik<TodoForm>
            initialValues={{
                title: 'test',
                description: 'test description',
            }}
            onSubmit={(values) => {
                mutate(values)
            }}
        >
            <Form className="my-4 flex flex-wrap items-center justify-center gap-2">
                <label htmlFor="title">Title:</label>
                <Field
                    id="title"
                    name="title"
                    placeholder="title"
                    className="border-2 p-1"
                />

                <label htmlFor="password">Description:</label>
                <Field
                    id="description"
                    name="description"
                    placeholder="description"
                    className="border-2 p-1"
                />
                <Button text="Add" type="submit" />
            </Form>
        </Formik>
    )
}
