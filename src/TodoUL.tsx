import { DeleteTodo, TodoArray, ToggleTodo } from "./types"
import { TodoItem } from "./TodoItem"

interface TodoULProps {
    todos: TodoArray,
    toggleTodo: ToggleTodo,
    deleteTodo: DeleteTodo
}

export function TodoUL({ todos, toggleTodo, deleteTodo }: TodoULProps) {
    return (
        <ul>
            {todos.length === 0 && <li>No Todos</li>}
            {todos.map(todo => {
            return (
                <TodoItem
                {...todo}
                key={todo.id}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                />
            )
            })}      
        </ul>
    )
}