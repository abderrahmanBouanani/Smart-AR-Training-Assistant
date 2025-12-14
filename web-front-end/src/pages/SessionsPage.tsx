import { useState, useEffect } from 'react';
import api from '../services/api';

interface Session {
    id: number;
    athlete_name: string;
    exercice_name: string;
    date: string;
    duree: number;
    score: number | null;
    status: string;
}

export default function SessionsPage() {
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await api.get('sessions/');
            setSessions(response.data);
        } catch (error) {
            console.error("Error fetching sessions", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`sessions/${id}/`);
            fetchSessions();
        } catch (error) {
            console.error("Error deleting session", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Sessions Monitoring</h1>
            <p>Admin view of all athlete sessions.</p>

            <ul>
                {sessions.map(s => (
                    <li key={s.id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #eee' }}>
                        <div>
                            <strong>{new Date(s.date).toLocaleString()}</strong>
                        </div>
                        <div>
                            Athlete: <strong>{s.athlete_name}</strong> | Exercise: <strong>{s.exercice_name}</strong>
                        </div>
                        <div>
                            Score: {s.score ?? 'N/A'} | Status: {s.status} | Duration: {s.duree} min
                        </div>
                        <div style={{ marginTop: '5px' }}>
                            <button onClick={() => handleDelete(s.id)} style={{ color: 'red' }}>Delete (Admin)</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
