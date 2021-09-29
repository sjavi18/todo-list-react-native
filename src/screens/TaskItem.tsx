import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import firebase from '../database/firebase.js/firebase'
import { mainStyles } from './TodoList'
import { formatDate } from '../utils/date-utils'
import { TodosContext } from '../context/TodoContext'

export interface TaskItemInterface {
    id: number,
    taskText: string,
    taskDate: any,
    taskCategory: string,
    navigation: any
}

export const TaskItem = (props: TaskItemInterface) => {

    const {deleteTodo} = useContext(TodosContext)

    const getColorCategory = (category: string) => {
        const colors: any = {
            'personal': mainStyles.personal,
            'office': mainStyles.office,
            'family': mainStyles.family
        }
        return colors[category]
    }

    const openConfirmation = () => {
        Alert.alert('Eliminar la tarea', 'Estás seguro?', [
            { text: 'Si, eliminar', onPress: () => deleteTodo(props.id) },
            { text: 'Cancelar', onPress: () => { } }
        ])
    }

    return (
        <View style={styles.container}>
            <View style={[styles.idxContainer, getColorCategory(props.taskCategory)]}>
            </View>
            <View style={styles.taskContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.task}>{props.taskText}</Text>
                    <Text style={styles.taskDate}>{formatDate(Number(props.taskDate.seconds))}</Text>
                </View>

                <TouchableOpacity onPress={() => { openConfirmation() }}>
                    <MaterialIcons name="delete-forever" size={28} color='#fff'> </MaterialIcons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('DetailTodo', {
                        todoId: props.id
                    })
                }}>
                    <MaterialIcons name="edit" size={28} color='#fff'> </MaterialIcons>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginEnd: 10
    },
    idxContainer: {
        borderRadius: 50,
        marginStart: 10,
        paddingEnd: -20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20
    },
    idx: {
        color: '#fff',
        fontSize: 20
    },
    taskContainer: {
        backgroundColor: '#334464',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50
    },
    task: {
        color: '#fff',
        width: '90%',
        fontSize: 18
    },
    taskDate: {
        fontSize: 12,
        color: '#ccc',
        fontWeight: '700'
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column'
    }
})
