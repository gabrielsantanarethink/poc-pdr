import TodoItem from '@/components/TodoItem';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import {useIsFocused} from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import {useSQLiteContext} from "expo-sqlite";

type TodoUiModel = {
    id: number;
    title: string;
    isChecked: boolean;
}

type TodoDataModel = {
    id: number;
    title: string;
    isChecked: number;
}

export default function Tab() {
    const isFocused = useIsFocused();
    const db = useSQLiteContext();
    const [todos, setTodos] = useState<TodoDataModel[]>([]);

    async function fetchTodos() {
        try {
            const result = await db.getAllAsync<TodoDataModel>('SELECT * FROM todos ORDER BY id DESC');
            setTodos(result);
            console.log("Got tasks: ", result);
        } catch (e) {
            console.log("Error fetching tasks: ", e);
        }
    }

    async function updateTask(id: number, isChecked: boolean) {
        try {
            await db.execAsync(`UPDATE todos
                                SET isChecked = ${isChecked ? 1 : 0}
                                WHERE id = ${id}`);
        } catch (e) {
            console.log("Error updating task: ", e);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [isFocused]);

    return (
        <View style={{flex: 1, padding: 24}}>
            <FlatList
                data={todos}
                renderItem={({item}) => (
                    <TodoItem
                        title={item.title}
                        completed={item.isChecked > 0}
                        onToggle={(newValue) => {
                            updateTask(item.id, newValue).then(fetchTodos);
                        }}
                    />
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});