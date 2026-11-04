import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.js';
import Teams from './components/Teams.js';
import Leaderboard from './components/Leaderboard.js';
import Workouts from './components/Workouts.js';
import Users from './components/Users.js';

export default function App() {
  return <div className="app-shell">
    <header className="app-hero">
      <div className="container py-5">
        <p className="text-uppercase fw-semibold small mb-2">Fitness community dashboard</p>
        <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
        <p className="lead mb-0">Build healthy habits, celebrate progress, and compete together.</p>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="OctoFit sections">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/users">OctoFit</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navigation" aria-controls="main-navigation" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="main-navigation">
            <div className="navbar-nav gap-lg-2">
              <Link className="nav-link" to="/users">Users</Link>
              <Link className="nav-link" to="/teams">Teams</Link>
              <Link className="nav-link" to="/activities">Activities</Link>
              <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              <Link className="nav-link" to="/workouts">Workouts</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <main className="container app-content pb-5">
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  </div>;
}
