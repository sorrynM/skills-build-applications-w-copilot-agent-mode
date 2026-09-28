import ResourcePage from './ResourcePage.jsx';

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'activityType', label: 'Activity' },
  { key: 'difficulty', label: 'Level' },
  { key: 'durationMinutes', label: 'Duration', render: (record) => `${record.durationMinutes ?? 0} min` },
  { key: 'description', label: 'Details' },
];

export default function Workouts() {
  return (
    <ResourcePage
      columns={columns}
      description="Suggested sessions for every starting point."
      resource="workouts"
      title="Workouts"
    />
  );
}
