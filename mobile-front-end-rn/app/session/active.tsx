import { View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

export default function ActiveSessionScreen() {
    const { exerciseId, exerciseName } = useLocalSearchParams();
    const [seconds, setSeconds] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleFinish = () => {
        router.replace({
            pathname: '/session/summary',
            params: {
                exerciseId,
                exerciseName,
                duration: Math.ceil(seconds / 60) // Duration in minutes
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Training in progress</Text>
            <Text style={styles.title}>{exerciseName}</Text>

            <View style={styles.timerContainer}>
                <Text style={styles.timer}>{formatTime(seconds)}</Text>
            </View>

            <Button title="Finish & Save" onPress={handleFinish} color="green" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    timerContainer: {
        marginBottom: 60,
    },
    timer: {
        fontSize: 64,
        fontWeight: 'bold',
        fontVariant: ['tabular-nums'],
    },
});
