import { StyleSheet, FlatList } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { API_URL } from '@/constants/config';

// const API_URL = 'http://10.0.2.2:8000/api/sessions/';
const SESSIONS_URL = `${API_URL}sessions/`;

interface Session {
    id: number;
    date: string;
    exercice_name: string;
    score: number | null;
    duree: number;
    status: string;
}

export default function SessionsScreen() {
    const [sessions, setSessions] = useState<Session[]>([]);

    useFocusEffect(
        useCallback(() => {
            fetchSessions();
        }, [])
    );

    const fetchSessions = async () => {
        try {
            const response = await axios.get(SESSIONS_URL);
            setSessions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                <ThemedText type="title">My History</ThemedText>
            </ThemedView>

            <FlatList
                data={sessions}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <ThemedView style={styles.card}>
                        <ThemedText type="defaultSemiBold">{item.exercice_name}</ThemedText>
                        <ThemedText>{new Date(item.date).toLocaleDateString()}</ThemedText>
                        <ThemedText>Score: {item.score ?? 'N/A'} | {item.duree} min</ThemedText>
                    </ThemedView>
                )}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 60,
    },
    header: {
        marginBottom: 20,
    },
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#rgba(100,100,100,0.1)',
        marginBottom: 12,
    },
});
