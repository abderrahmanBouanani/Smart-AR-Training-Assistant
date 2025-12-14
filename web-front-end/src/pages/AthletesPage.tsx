import { useState, useEffect } from 'react';
import api from '../services/api';

interface User {
    id: number;
    username: string;
}

interface Athlete {
    id: number;
    user: number;
    username: string;
    sexe: string;
    age: number;
    poids: number;
    taille: number;
    niveau_sportif: string;
}

export default function AthletesPage() {
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Form State
    const [userId, setUserId] = useState<number | ''>('');
    const [sexe, setSexe] = useState('HOMME');
    const [age, setAge] = useState('');
    const [poids, setPoids] = useState('');
    const [taille, setTaille] = useState('');
    const [niveau, setNiveau] = useState('DEBUTANT');

    useEffect(() => {
        fetchAthletes();
        fetchUsers();
    }, []);

    const fetchAthletes = async () => {
        try {
            const response = await api.get('athletes/');
            setAthletes(response.data);
        } catch (error) {
            console.error("Error fetching athletes", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await api.get('users/');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`athletes/${id}/`);
            fetchAthletes();
        } catch (error) {
            console.error("Error deleting athlete", error);
        }
    };

    const handleEdit = (athlete: Athlete) => {
        setUserId(athlete.user);
        setSexe(athlete.sexe);
        setAge(athlete.age.toString());
        setPoids(athlete.poids.toString());
        setTaille(athlete.taille.toString());
        setNiveau(athlete.niveau_sportif);
        setEditingId(athlete.id);
    };

    const handleCancelEdit = () => {
        setUserId('');
        setSexe('HOMME');
        setAge('');
        setPoids('');
        setTaille('');
        setNiveau('DEBUTANT');
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                user: userId,
                sexe,
                age: Number(age),
                poids: Number(poids),
                taille: Number(taille),
                niveau_sportif: niveau
            };

            if (editingId) {
                await api.put(`athletes/${editingId}/`, payload);
            } else {
                await api.post('athletes/', payload);
            }

            handleCancelEdit();
            fetchAthletes();
        } catch (error) {
            console.error("Error saving athlete", error);
            alert("Error saving athlete! Ensure the user doesn't already have a profile.");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Athletes Management</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>{editingId ? "Edit Athlete" : "Add New Athlete"}</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>User: </label>
                    <select
                        value={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
                        required
                        disabled={editingId !== null} // Prevent changing user on edit
                    >
                        <option value="">Select a User</option>
                        {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Gender: </label>
                    <select value={sexe} onChange={(e) => setSexe(e.target.value)}>
                        <option value="HOMME">Homme</option>
                        <option value="FEMME">Femme</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Age: </label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Weight (kg): </label>
                    <input type="number" value={poids} onChange={(e) => setPoids(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Height (cm): </label>
                    <input type="number" value={taille} onChange={(e) => setTaille(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Level: </label>
                    <select value={niveau} onChange={(e) => setNiveau(e.target.value)}>
                        <option value="DEBUTANT">Débutant</option>
                        <option value="INTERMEDIAIRE">Intermédiaire</option>
                        <option value="AVANCE">Avancé</option>
                    </select>
                </div>

                <button type="submit">{editingId ? "Update" : "Add"} Athlete</button>
                {editingId && <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel</button>}
            </form>

            <ul>
                {athletes.map(a => (
                    <li key={a.id} style={{ marginBottom: '10px' }}>
                        <strong>{a.username}</strong> ({a.sexe}, {a.age} ans) - {a.niveau_sportif}
                        <div style={{ marginTop: '5px' }}>
                            <button onClick={() => handleEdit(a)} style={{ marginRight: '5px' }}>Edit</button>
                            <button onClick={() => handleDelete(a.id)} style={{ color: 'red' }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
