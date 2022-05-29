import React from 'react'
import { Todo } from '../pages'

type Props = {
    todo: Todo
}

export const TodoDetailComponent: React.FC<Props> = ({ todo }) => (
    <div className="flex flex-shrink flex-grow items-end justify-between gap-4 border p-2 shadow">
        <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-fuchsia-600 underline">
                {todo.title}
            </h3>
            <span>{todo.description}</span>
        </div>
        <button className="">{todo.done ? 'done' : 'not done'}</button>
    </div>
)
