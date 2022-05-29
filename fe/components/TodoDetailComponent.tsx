import React from 'react'
import { Todo } from '../pages'

type Props = {
    todo: Todo
}

export const TodoDetailComponent: React.FC<Props> = ({ todo }) => (
    <div className="flex items-end justify-between p-2 border shadow flex-grow flex-shrink gap-4">
        <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl underline text-fuchsia-600">
                {todo.title}
            </h3>
            <span>{todo.description}</span>
        </div>
        <button className="">{todo.done ? 'done' : 'not done'}</button>
    </div>
)
