import React from 'react'
import { Todo } from '../pages'
import { Button } from './Button'
import { useMutation, useQueryClient } from 'react-query'
import { useLoginContext } from '../context/LoginContext'

type Props = {
    todo: Todo
}

export const TodoDetailComponent: React.FC<Props> = ({ todo }) => {
    const queryClient = useQueryClient()
    const user = useLoginContext()
    const { mutate } = useMutation<Response, Error, { todoId: number }>(
        ({ todoId }) => {
            return fetch(`http://127.0.0.1:4000/todo/toggle/${todoId}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
                method: 'POST',
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('todos')
            },
        }
    )

    return (
        <div className="flex flex-shrink flex-grow items-end justify-between gap-4 border p-2 shadow">
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-fuchsia-600 underline">
                    {todo.title}
                </h3>
                <span>{todo.description}</span>
            </div>
            <Button
                text={todo.done ? 'done' : 'not done'}
                onClick={() => {
                    mutate({ todoId: todo.id })
                }}
            />
        </div>
    )
}
