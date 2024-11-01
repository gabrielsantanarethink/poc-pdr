import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

export type TodoItemProps = {
  title: string;
  completed: boolean;
  onToggle: (newValue: boolean) => void
}

export default function TodoItem(props: TodoItemProps) {
  return (
    <View style={styles.container}>
      <Text style={{ textDecorationLine: props.completed ? 'line-through' : 'none', flex: 1 }}>
        {props.title}
      </Text>
      <Checkbox
        value={props.completed}
        onValueChange={() => props.onToggle(!props.completed)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 8
  }
});