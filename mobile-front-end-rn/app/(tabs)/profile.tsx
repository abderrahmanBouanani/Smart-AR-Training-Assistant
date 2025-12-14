import { StyleSheet, Button } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const { user, signOut } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        signOut();
        router.replace('/login');
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Profile</ThemedText>

            <ThemedView style={styles.info}>
                <ThemedText type="subtitle">Stats</ThemedText>
                <ThemedText>Username: {user?.username}</ThemedText>
                <ThemedText>ID: {user?.id}</ThemedText>
            </ThemedView>

            <Button title="Logout" onPress={handleLogout} color="red" />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 60,
    },
    info: {
        marginTop: 20,
        marginBottom: 40,
        padding: 20,
        backgroundColor: '#rgba(100,100,100,0.1)',
        borderRadius: 12,
    },
});
