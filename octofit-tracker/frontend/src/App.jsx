import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Octofit Tracker</h1>
          <p>React 19 presentation tier for the multi-tier app.</p>
          <p>Define VITE_CODESPACE_NAME in .env.local for Codespaces URLs.</p>
        </header>

        <nav>
          <Link to="/">Users</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
