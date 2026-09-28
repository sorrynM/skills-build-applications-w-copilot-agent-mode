import { Link, NavLink, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import logo from '../../../docs/octofitapp-small.png';
import { API_BASE_URL } from './api.js';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const navigation = [
  { to: '/activities', label: 'Activities', index: '01' },
  { to: '/leaderboard', label: 'Leaderboard', index: '02' },
  { to: '/teams', label: 'Teams', index: '03' },
  { to: '/users', label: 'Users', index: '04' },
  { to: '/workouts', label: 'Workouts', index: '05' },
];

function AppLayout() {
  const apiHost = new URL(API_BASE_URL).host;

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <Link className="brand" to="/activities" aria-label="OctoFit Tracker home">
          <img className="brand-logo" src={logo} alt="" />
          <span className="brand-copy">
            <strong>OCTOFIT</strong>
            <small>TRACKER</small>
          </span>
        </Link>

        <div className="sidebar-section-label">TRACKING</div>
        <nav className="primary-navigation" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `navigation-link${isActive ? ' is-active' : ''}`}
              key={item.to}
              to={item.to}
            >
              <span className="navigation-index">{item.index}</span>
              <span>{item.label}</span>
              <span className="navigation-arrow" aria-hidden="true">+</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="school-mark" aria-hidden="true">MH</span>
          <span>
            <strong>Mergington High</strong>
            <small>WELLNESS PROGRAM</small>
          </span>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div>
            <p className="topbar-kicker">STUDENT WELLNESS</p>
            <p className="topbar-title">Activity workspace</p>
          </div>
          <div className="api-status" title={`API: ${apiHost}`}>
            <span className="status-dot" aria-hidden="true" />
            <span className="api-status-label">API</span>
            <span className="api-host">{apiHost}</span>
          </div>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h1>This view is off the map.</h1>
      <Link className="text-link" to="/activities">Return to activities</Link>
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="/activities" />} />
        <Route path="activities" element={<Activities />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="users" element={<Users />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;