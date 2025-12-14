import { StyleSheet, FlatList, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import axios from 'axios';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { API_URL } from '@/constants/config';

export default function SportExercisesScreen() {
    const { id, name } = useLocalSearchParams();
    const [exercises, setExercises] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (id) fetchExercises();
    }, [id]);

    const fetchExercises = async () => {
        console.log(`Fetching exercises for sport ${id}`);
        try {
            const response = await axios.get(`${API_URL}exercices/?sport=${id}`);
            setExercises(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: name as string }} />

            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={exercises}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={<ThemedText style={{ textAlign: 'center', marginTop: 20 }}>No exercises found for this sport.</ThemedText>}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => router.push(`/exercise/${item.id}`)}
                        >
                            <ThemedText type="subtitle">{item.nom}</ThemedText>
                            <ThemedText>Difficulty: {item.difficulte}</ThemedText>
                        </TouchableOpacity>
                    )}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#rgba(100,100,100,0.1)',
        marginBottom: 12,
    },
});
