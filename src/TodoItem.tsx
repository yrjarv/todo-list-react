import { Todo, DeleteTodo, ToggleTodo} from "./types"

export interface TodoItemProps extends Todo {
    deleteTodo: DeleteTodo,
    toggleTodo: ToggleTodo
}

export function TodoItem(
        { id, title, completed, toggleTodo, deleteTodo}: TodoItemProps
    ) {
    return <li>
        <label>
            <input
            type="checkbox"
            checked={completed}
            onChange={e => toggleTodo(id, e.target.checked)}
            />
            {title}
        </label>
        <button
            className="btn btn-danger"
            onClick={() => deleteTodo(id)}
        >
            Delete
        </button>
    </li>
}