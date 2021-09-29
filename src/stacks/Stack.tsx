import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { TodoList } from '../../src/screens/TodoList'
import { DetailTodo } from '../../src/screens/DetailTodo'

const Stack = createStackNavigator()
export const TodoStack = () => {
  return (<Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'#1a233c', borderBottomColor:'#fff'}}}>
    <Stack.Screen name="TodoList" component={TodoList} options={{title:'Tareas', headerTintColor: '#fff'}}/>
    <Stack.Screen name="DetailTodo" component={DetailTodo} options={{title:'Tarea' , headerTintColor: '#fff'}}/>
  </Stack.Navigator>)
}
