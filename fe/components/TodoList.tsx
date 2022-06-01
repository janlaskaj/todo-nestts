import React from 'react'
import { Todo } from '../pages'
import { TodoDetailComponent } from './TodoDetailComponent'
import { TodoForm } from './TodoForm'

type Props = {
    todos: Todo[]
    refetch: any
}

export const TodoList: React.FC<Props> = ({ todos, refetch }) => {
    return (
        <div className="flex w-full max-w-5xl flex-col">
            <TodoForm refetch={refetch} />
            <div className="my-8 grid w-full grid-cols-2 gap-4">
                {todos.map((todo) => (
                    <TodoDetailComponent key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    )
}
