import React, { useEffect, useState } from 'react'
import { StyleSheet, ActivityIndicator, View, ScrollView, TouchableOpacity, Text } from 'react-native'
import firebase from '../database/firebase.js/firebase'
import { TaskItem } from './TaskItem'

export const TodoList = (props: any) => {
    const [todos, setTodos] = useState([])
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        firebase.db.collection('todos').onSnapshot(querySnapshot => {
            const todos: any = []
            querySnapshot.docs.forEach(doc => {
                const { todo, date, category } = doc.data()
                todos.push({
                    id: doc.id,
                    todo,
                    date,
                    category
                })
            })
            setTodos(todos)
            setShowSpinner(false)
        })
    }, [])
    return (
        <View style={mainStyles.container}>
            <ActivityIndicator size="large" color="#00ff00" style={showSpinner ? { display: 'flex' } : { display: 'none' }} />
            <ScrollView style={mainStyles.scrollView}>
                {
                    todos.map((data: any) => {
                        return (
                            <View key={data.id} style={mainStyles.taskContainer}>
                                <TaskItem id={data.id} taskText={data.todo} taskDate={data.date} taskCategory={data.category} navigation={props.navigation} />
                            </View>
                        )
                    })
                }
            </ScrollView>
            <TouchableOpacity style={mainStyles.buttonActions} onPress={() => props.navigation.navigate('DetailTodo', {
                todoId: ''
            })}>
                <Text style={mainStyles.textActions} onPress={() => props.navigation.navigate('DetailTodo', {
                todoId: ''
            })}>Crear tarea</Text>
            </TouchableOpacity>
        </View>
    )
}

export const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a233c'
    },
    head: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 70,
        marginBottom: 10,
        marginLeft: 20
    },
    scrollView: {
        marginBottom: 70,
    },
    taskContainer: {
        marginTop: 20,
    },
    buttonActions: {
        borderColor: '#fff',
        backgroundColor: '#354e77',
        borderWidth: 1,
        marginHorizontal: 70,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 50,
        width: '70%',
        height: 50
    },
    textActions: {
        color: '#fff',
        fontSize: 20
    },
    personal: {
        backgroundColor: '#7569d1'
    },
    office: {
        backgroundColor: '#f4afc6'
    },
    family: {
        backgroundColor: '#f8d58b'
    },
    default: {
        backgroundColor: '#ccc'
    }
});
