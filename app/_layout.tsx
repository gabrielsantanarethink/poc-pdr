import { Stack } from 'expo-router/stack';
import {SQLiteDatabase, SQLiteProvider} from "expo-sqlite";

export default function RootLayout() {
    return (
        <SQLiteProvider databaseName={'todoListDatabase'} onInit={migrateDbIfNeeded}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </SQLiteProvider>
    );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
        'PRAGMA user_version'
    );
    if (currentDbVersion >= DATABASE_VERSION) {
        return;
    }
    if (currentDbVersion === 0) {
        await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, isChecked INTEGER);
`);
        await db.runAsync('INSERT INTO todos (title, isChecked) VALUES (?, ?)', 'hello', 0);
        await db.runAsync('INSERT INTO todos (title, isChecked) VALUES (?, ?)', 'world', 1);
        currentDbVersion = 1;
    }
    // if (currentDbVersion === 1) {
    //   Add more migrations
    // }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}