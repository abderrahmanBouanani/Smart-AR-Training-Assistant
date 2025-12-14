import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/config';

// const API_URL = 'http://10.0.2.2:8000/api/';

interface Exercise {
    id: number;
    nom: string;
    description: string;
    difficulte: string;
    sport_name: string;
}

export default function ExerciseDetailScreen() {
    const { id } = useLocalSearchParams();
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchExercise();
    }, [id]);

    const fetchExercise = async () => {
        try {
            const response = await axios.get(`${API_URL}exercices/${id}/`);
            setExercise(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!exercise) return <ActivityIndicator style={{ marginTop: 50 }} />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{exercise.nom}</Text>
            <Text style={styles.subtitle}>{exercise.sport_name} - {exercise.difficulte}</Text>

            <View style={styles.content}>
                <Text style={styles.description}>{exercise.description}</Text>
            </View>

            <Button
                title="Start Training"
                onPress={() => router.push({
                    pathname: '/session/active',
                    params: { exerciseId: exercise.id, exerciseName: exercise.nom }
                })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    content: {
        padding: 15,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginBottom: 30,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
    },
});
