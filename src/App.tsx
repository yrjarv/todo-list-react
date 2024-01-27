import { useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { TodoForm } from "./TodoForm"
import { TodoUL } from "./TodoUL"
import { Todo } from "./types"
import "./styles.css"

export default function App() {
  // Initalize Firebase
  const firebaseConfig = {
    apiKey: import.meta.env.APIKEY,
    authDomain: import.meta.env.AUTHDOMAIN,
    projectId: import.meta.env.PROJECTID,
    storageBucket: import.meta.env.STORAGEBUCKET,
    messagingSenderId: import.meta.env.MESSAGINGSENDERID,
    appId: import.meta.env.APPID
  }
  const app = initializeApp(firebaseConfig)

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
      <TodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoUL todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}