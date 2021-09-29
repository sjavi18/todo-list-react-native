import React, { createContext } from 'react'
import { TodosContextState } from './interfaces'
import firebase from '../database/firebase.js/firebase'

const contextDefaultValues: TodosContextState = {
    addTodo: (todo: any) => { },
    deleteTodo: (id: any) => { },
    updateTodo: (todo: any) => { }
}

export const TodosContext = createContext<TodosContextState>(
    contextDefaultValues
  );

export const TodosProvider = ({children}: any) => {

    const addTodo = async (editTodo: any) => {
        try {
            await firebase.db.collection('todos').add({
                todo: editTodo.todo,
                date: editTodo.date,
                category: editTodo.category
            })
        } catch (error) {
            console.error(error)
        }
    }

    const deleteTodo = async (id: any) => {
        const dbRef = firebase.db.collection('todos').doc(id)
        await dbRef.delete()
    }

    const updateTodo = async (editTodo: any) => {
        const dbRef = firebase.db.collection('todos').doc(editTodo.id)
        await dbRef.set({
            todo: editTodo.todo,
            date: editTodo.date,
            category: editTodo.category
        })
    }

  return (
    <TodosContext.Provider
      value={{
        addTodo,
        deleteTodo,
        updateTodo
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
