import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { API_URL } from '../constants/config';

// API_URL is now dynamic
const USERS_URL = `${API_URL}users/`;

interface User {
    id: number;
    username: string;
}

export default function LoginScreen() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const { signIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setErrorMsg(null);
        try {
            console.log('Fetching from:', USERS_URL);
            const response = await axios.get(USERS_URL);
            setUsers(response.data);
            if (response.data.length === 0) {
                setErrorMsg("Aucun utilisateur trouvé (Base vide ?)");
            }
        } catch (error: any) {
            console.error('Error fetching users:', error);
            setErrorMsg(`Erreur connexion au serveur : ${error.message}\nURL: ${USERS_URL}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (user: User) => {
        signIn(user);
        router.replace('/(tabs)');
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text style={{ textAlign: 'center', marginTop: 10 }}>Connexion au serveur...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Smart AR Training</Text>
            <Text style={styles.subtitle}>Sélectionnez votre profil :</Text>

            {errorMsg ? (
                <View style={{ padding: 20, backgroundColor: '#ffebee', borderRadius: 8, alignItems: 'center' }}>
                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>{errorMsg}</Text>
                    <TouchableOpacity onPress={fetchUsers} style={{ padding: 10, backgroundColor: '#ddd', borderRadius: 5 }}>
                        <Text>Réessayer</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.userCard} onPress={() => handleLogin(item)}>
                            <Text style={styles.username}>{item.username}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    userCard: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    username: {
        fontSize: 18,
        textAlign: 'center',
    },
});
