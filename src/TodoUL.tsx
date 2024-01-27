import { DeleteTodo, TodoArray, ToggleTodo } from "./types"
import { TodoItem } from "./TodoItem"

interface TodoULProps {
    todos: TodoArray,
    toggleTodo: ToggleTodo,
    deleteTodo: DeleteTodo
}

export function TodoUL({ todos, toggleTodo, deleteTodo }: TodoULProps) {
    return (
        <ul className="list">
            {todos.length === 0 && "No Todos"}
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