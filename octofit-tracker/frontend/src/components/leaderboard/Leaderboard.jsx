import ResourcePage from '../ResourcePage.jsx';

const columns = [
  { key: 'user', label: 'Athlete' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points', render: (record) => <strong className="points-value">{record.points ?? 0}</strong> },
];

export default function Leaderboard() {
  return (
    <ResourcePage
      columns={columns}
      description="A running snapshot of individual team effort."
      resource="leaderboard"
      title="Leaderboard"
    />
  );
}