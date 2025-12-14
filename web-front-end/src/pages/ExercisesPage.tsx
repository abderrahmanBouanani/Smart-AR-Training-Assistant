import { useState, useEffect } from 'react';
import api from '../services/api';

interface Sport {
    id: number;
    nom: string;
}

interface Exercise {
    id: number;
    nom: string;
    description: string;
    difficulte: string;
    sport: number;
    sport_name: string;
}

export default function ExercisesPage() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [sports, setSports] = useState<Sport[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Form State
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [difficulte, setDifficulte] = useState('FACILE');
    const [selectedSport, setSelectedSport] = useState<number | ''>('');

    useEffect(() => {
        fetchExercises();
        fetchSports();
    }, []);

    const fetchExercises = async () => {
        const response = await api.get('exercices/');
        setExercises(response.data);
    };

    const fetchSports = async () => {
        const response = await api.get('sports/');
        setSports(response.data);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`exercices/${id}/`);
            fetchExercises();
        } catch (error) {
            console.error("Error deleting exercise", error);
        }
    };

    const handleEdit = (ex: Exercise) => {
        setNom(ex.nom);
        setDescription(ex.description);
        setDifficulte(ex.difficulte);
        setSelectedSport(ex.sport);
        setEditingId(ex.id);
    };

    const handleCancelEdit = () => {
        setNom('');
        setDescription('');
        setDifficulte('FACILE');
        setSelectedSport('');
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                nom,
                description,
                difficulte,
                sport: selectedSport
            };

            if (editingId) {
                await api.put(`exercices/${editingId}/`, payload);
            } else {
                await api.post('exercices/', payload);
            }

            handleCancelEdit();
            fetchExercises();
        } catch (error) {
            console.error("Error saving exercise", error);
            alert("Error saving exercise! Check console for details.");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Exercises Management</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>{editingId ? "Edit Exercise" : "Add New Exercise"}</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>Sport: </label>
                    <select
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(Number(e.target.value))}
                        required
                    >
                        <option value="">Select a Sport</option>
                        {sports.map(s => <option key={s.id} value={s.id}>{s.nom}</option>)}
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Name: </label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Description: </label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Difficulty: </label>
                    <select value={difficulte} onChange={(e) => setDifficulte(e.target.value)}>
                        <option value="FACILE">Facile</option>
                        <option value="MOYENNE">Moyenne</option>
                        <option value="DIFFICILE">Difficile</option>
                    </select>
                </div>
                <button type="submit">{editingId ? "Update" : "Add"} Exercise</button>
                {editingId && <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel</button>}
            </form>

            <ul>
                {exercises.map(ex => (
                    <li key={ex.id} style={{ marginBottom: '10px' }}>
                        [{ex.sport_name}] <strong>{ex.nom}</strong> ({ex.difficulte})
                        <div style={{ marginTop: '5px' }}>
                            <button onClick={() => handleEdit(ex)} style={{ marginRight: '5px' }}>Edit</button>
                            <button onClick={() => handleDelete(ex.id)} style={{ color: 'red' }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
