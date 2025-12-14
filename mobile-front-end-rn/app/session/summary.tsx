import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/components/AuthContext';
import { API_URL } from '@/constants/config';

// const API_URL = 'http://10.0.2.2:8000/api/';

export default function SessionSummaryScreen() {
    const { exerciseId, exerciseName, duration } = useLocalSearchParams();
    const [score, setScore] = useState('');
    const [saving, setSaving] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            // Need to find Athlete ID from User ID first (or store Athlete in AuthContext)
            // For MVP, we will fetch athlete ID based on user ID
            const athletesRes = await axios.get(API_URL + 'athletes/');
            const athlete = athletesRes.data.find((a: any) => a.user === user.id);

            if (!athlete) {
                alert("No athlete profile found for this user!");
                setSaving(false);
                return;
            }

            await axios.post(API_URL + 'sessions/', {
                athlete: athlete.id,
                exercice: exerciseId,
                duree: duration,
                score: Number(score),
                status: 'TERMINE',
                date: new Date().toISOString()
            });

            router.replace('/(tabs)/sessions');
        } catch (error) {
            console.error(error);
            alert("Error saving session");
            setSaving(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Session Finished!</Text>
            <Text style={styles.subtitle}>{exerciseName}</Text>
            <Text style={styles.info}>Duration: {duration} min</Text>

            <Text style={styles.label}>Enter Score (Reps/Points):</Text>
            <TextInput
                style={styles.input}
                value={score}
                onChangeText={setScore}
                keyboardType="numeric"
                placeholder="0"
            />

            {saving ? (
                <ActivityIndicator />
            ) : (
                <Button title="Save Session" onPress={handleSave} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    info: {
        fontSize: 16,
        marginBottom: 40,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '50%',
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 24,
    },
});
