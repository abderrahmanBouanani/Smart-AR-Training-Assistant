import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SportsPage from './pages/SportsPage';
import ExercisesPage from './pages/ExercisesPage';
import AthletesPage from './pages/AthletesPage';
import SessionsPage from './pages/SessionsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav style={{ padding: '20px', background: '#f0f0f0', marginBottom: '20px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sports">Sports</Link></li>
            <li><Link to="/exercises">Exercises</Link></li>
            <li><Link to="/athletes">Athletes</Link></li>
            <li><Link to="/sessions">Sessions</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h1>Admin Dashboard</h1>
              <p>Welcome to the Smart AR Training Assistant Admin Panel.</p>
              <p>Use the menu to manage content.</p>
            </div>
          } />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/athletes" element={<AthletesPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
