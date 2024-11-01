import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Tasks',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="tasks" color={color} />,
                }}
            />
            <Tabs.Screen
                name="new_task"
                options={{
                    title: 'New Task',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
                }}
            />
        </Tabs>
    );
}
