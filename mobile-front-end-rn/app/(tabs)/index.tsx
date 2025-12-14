import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { API_URL } from '@/constants/config';

// Android Emulator localhost
const SPORTS_URL = `${API_URL}sports/`;

interface Sport {
  id: number;
  nom: string;
  description: string;
}

export default function SportsScreen() {
  const [sports, setSports] = useState<Sport[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await axios.get(SPORTS_URL);
      setSports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Sports Catalog</ThemedText>
        <ThemedText>Select a sport to see exercises</ThemedText>
      </ThemedView>

      <FlatList
        data={sports}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/sport/${item.id}?name=${item.nom}`)}
          >
            <ThemedText type="subtitle">{item.nom}</ThemedText>
            <ThemedText numberOfLines={2}>{item.description}</ThemedText>
          </TouchableOpacity>
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
