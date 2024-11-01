import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {useState} from "react";
import {useSQLiteContext} from "expo-sqlite";

export default function Tab() {
    const [text, onChangeText] = useState('');
    const db = useSQLiteContext();

    async function add() {
        await db.execAsync(`INSERT INTO todos (title, isChecked) VALUES ('${text}', 0)`);
    }

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={onChangeText}
                value={text}
                style={styles.input}
                placeholder={"Enter a new task"}
                />
            <Button title={"Add"} onPress={() => {
                add().then(() => onChangeText(''));
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    input: {
        width: '100%',
        height: 52,
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
});