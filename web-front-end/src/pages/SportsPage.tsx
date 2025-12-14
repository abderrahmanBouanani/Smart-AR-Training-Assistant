import { useState, useEffect } from 'react';
import api from '../services/api';

interface Sport {
    id: number;
    nom: string;
    description: string;
}

export default function SportsPage() {
    const [sports, setSports] = useState<Sport[]>([]);
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchSports();
    }, []);

    const fetchSports = async () => {
        try {
            const response = await api.get('sports/');
            setSports(response.data);
        } catch (error) {
            console.error("Error fetching sports", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`sports/${id}/`);
            fetchSports();
        } catch (error) {
            console.error("Error deleting sport", error);
        }
    };

    const handleEdit = (sport: Sport) => {
        setNom(sport.nom);
        setDescription(sport.description);
        setEditingId(sport.id);
    };

    const handleCancelEdit = () => {
        setNom('');
        setDescription('');
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`sports/${editingId}/`, { nom, description });
            } else {
                await api.post('sports/', { nom, description });
            }
            handleCancelEdit();
            fetchSports();
        } catch (error) {
            console.error("Error saving sport", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Sports Management</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>{editingId ? "Edit Sport" : "Add New Sport"}</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Description: </label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">{editingId ? "Update" : "Add"} Sport</button>
                {editingId && <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel</button>}
            </form>

            <ul>
                {sports.map(sport => (
                    <li key={sport.id} style={{ marginBottom: '10px' }}>
                        <strong>{sport.nom}</strong>: {sport.description}
                        <div style={{ marginTop: '5px' }}>
                            <button onClick={() => handleEdit(sport)} style={{ marginRight: '5px' }}>Edit</button>
                            <button onClick={() => handleDelete(sport.id)} style={{ color: 'red' }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
