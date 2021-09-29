import React, { useContext, useEffect, useState } from 'react'
import { Text, View, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import firebase from '../database/firebase.js/firebase'
import DateTimePicker from '@react-native-community/datetimepicker'
import { mainStyles } from './TodoList'
import { secondsToDate } from '../utils/date-utils'
import TODO_CONS from '../constants/todo-constants'
import { TodosContext } from '../context/TodoContext'

export const DetailTodo = (props: any) => {

    const { addTodo, updateTodo} = useContext(TodosContext)

    const initialValues = {
        todo: '',
        date: new Date(),
        category: TODO_CONS.CATEGORY.PERSONAL,
        id: ''
    }

    const [editTodo, setEditTodo] = useState(initialValues)
    const [todoId, setTodoId] = useState('')

    const getTodoById = async (id: any) => {
        const dbRef = firebase.db.collection('todos').doc(id)
        const doc = await dbRef.get()
        const todoObj: any = doc.data()
        const setObj: any = {
            todo: todoObj.todo,
            date: new Date(secondsToDate(todoObj.date.seconds)),
            category: todoObj.category,
            id: id
        }
        setEditTodo(setObj)
    }

    const actionBtn = () => {
        if (todoId !== '') {
            updateTodo(editTodo)
            setEditTodo(initialValues)
         } else {
            addTodo(editTodo)
         }
         props.navigation.navigate('TodoList')
    }

    useEffect(() => {
        setTodoId(props.route.params.todoId)
        if (props.route.params.todoId !== '') getTodoById(props.route.params.todoId)
    }, [])

    const mode = 'date'
    const show = true
    const minDate = new Date()

    return (<ScrollView style={styles.container}>
        <View>
            <TextInput style={styles.input} value={editTodo.todo} keyboardAppearance='dark' onChangeText={(value: any) => setEditTodo({ ...editTodo, todo: value })} />
        </View>
        <View>
            {show && (
                <DateTimePicker
                    minimumDate={minDate}
                    textColor="#fff"
                    testID="dateTimePicker"
                    value={editTodo.date}
                    mode={mode}
                    is24Hour={true}
                    display="spinner"
                    themeVariant="light"
                    onChange={(e: any, value: any) => setEditTodo({ ...editTodo, date: value })}
                />
            )}
        </View>
        <View style={styles.buttonGroup}>
            <TouchableOpacity
                style={[styles.button, editTodo.category === TODO_CONS.CATEGORY.PERSONAL ? mainStyles.personal : mainStyles.default]}
                onPress={() => {
                    setEditTodo({
                        ...editTodo, category: TODO_CONS.CATEGORY.PERSONAL
                    })
                }}
            >
                <Text>Personal</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, editTodo.category === TODO_CONS.CATEGORY.OFFICE ? mainStyles.office : mainStyles.default]}
                onPress={() => {
                    setEditTodo({
                        ...editTodo, category: TODO_CONS.CATEGORY.OFFICE
                    })
                }}
            >
                <Text>Oficina</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, editTodo.category === TODO_CONS.CATEGORY.FAMILY ? mainStyles.family : mainStyles.default]}
                onPress={() => {
                    setEditTodo({
                        ...editTodo, category: TODO_CONS.CATEGORY.FAMILY
                    })
                }}
            >
                <Text>Hogar y familia</Text>
            </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 90 }}>
            <TouchableOpacity
                style={mainStyles.buttonActions}
                onPress={() => actionBtn()}
            >
                {
                    todoId !== '' ?
                    <Text style={mainStyles.textActions} onPress={() => actionBtn()}>Editar tarea</Text>
                    :
                    <Text style={mainStyles.textActions} onPress={() => actionBtn()}>Crear tarea</Text>
                }
                
            </TouchableOpacity>
        </View>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a233c',
        paddingTop: 25,
        flexDirection: 'column'
    },
    input: {
        color: 'black',
        backgroundColor: '#fff',
        height: 50,
        flex: 1,
        paddingHorizontal: 10,
        marginHorizontal: 13,
        borderRadius: 4
    },
    button: {
        alignItems: "center",
        padding: 20,
        margin: 5,
        borderRadius: 8
    },
    buttonSave: {
        alignItems: "center",
        backgroundColor: "#2e5cc0",
        padding: 20,
        marginVertical: 35,
        marginHorizontal: 12,
        borderRadius: 8
    },
    buttonGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    textSave: {
        color: '#fff',
        fontSize: 20
    }
})