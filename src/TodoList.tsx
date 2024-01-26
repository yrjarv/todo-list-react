import { DeleteTodo, TodoArray, ToggleTodo } from "./types"
import { TodoItem } from "./TodoItem"

interface TodoListProps {
    todos: TodoArray,
    toggleTodo: ToggleTodo,
    deleteTodo: DeleteTodo
}

export function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
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