import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import { Todo } from "./types"
import "./styles.css"

export default function App() {
  const [todos, setTodos] = useState(():Todo[] => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue === null) {return []}
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title: string) {
    setTodos((currentTodos: Todo[]): Todo[] => {
      return [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false }
      ]
    })
  }

  function toggleTodo(id: string, completed: boolean) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id: string) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}