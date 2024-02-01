import { useEffect, useState } from "react"
import { TodoForm } from "./TodoForm"
import { TodoUL } from "./TodoUL"
import { Todo } from "./types"
import "./styles.css"
import { firebaseConfig } from "./firebase"
import firebase from "firebase/compat/app"
import 'firebase/firestore';
import 'firebase/compat/firestore';

firebase.initializeApp(firebaseConfig)

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Fetch todos from Firestore
    const fetchTodos = async () => {
      try {
        const snapshot = await firebase.firestore().collection('todoelements').get();
        const todosFromFirestore = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Todo[];
        setTodos(todosFromFirestore);
      } catch (error) {
        console.error('Error fetching todos from Firestore:', error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    // Upload todos to Firestore and delete the ones not in todos
    const updateFirestore = async () => {
      try {
        // Get existing todo IDs from Firestore
        const snapshot = await firebase.firestore().collection('todoelements').get();
        const existingTodoIds = snapshot.docs.map((doc) => doc.id);

        // Filter todos to be added
        const todosToAdd = todos.filter((todo) => !existingTodoIds.includes(todo.id));

        // Filter todos to be deleted
        const todosToDelete = existingTodoIds.filter(
          (existingTodoId) => !todos.some((todo) => todo.id === existingTodoId)
        );

        // Add new todos to Firestore
        const addTodoPromises = todosToAdd.map((todo) =>
          firebase.firestore().collection('todoelements').add(todo)
        );

        // Delete todos not in todos from Firestore
        const deleteTodoPromises = todosToDelete.map((todoId) =>
          firebase.firestore().collection('todoelements').doc(todoId).delete()
        );

        // Wait for all operations to complete
        await Promise.all([...addTodoPromises, ...deleteTodoPromises]);
      } catch (error) {
        console.error('Error updating Firestore:', error);
      }
    };

    updateFirestore();
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodos((currentTodos: Todo[]) => [...currentTodos, newTodo]);
  };

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
      <h1>Todo List</h1>
      <TodoUL todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}