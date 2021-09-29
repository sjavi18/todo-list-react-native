
import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { TodoStack } from './src/stacks/Stack';
import { TodosProvider } from './src/context/TodoContext';

export default function App() {
  return (
    <TodosProvider>
      <NavigationContainer>
        <TodoStack></TodoStack>
      </NavigationContainer>
    </TodosProvider>
  );
}