export interface Todo {
    id: string,
    title: string,
    completed: boolean
}
export type TodoArray = Todo[]
export type DeleteTodo = (id: string) => void
export type ToggleTodo = (id: string, completed: boolean) => void
