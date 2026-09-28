import ResourcePage from '../ResourcePage.jsx';

function formatDate(value) {
  if (!value) return 'Not set';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Not set'
    : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

const columns = [
  { key: 'activityType', label: 'Activity' },
  { key: 'user', label: 'Athlete' },
  { key: 'durationMinutes', label: 'Minutes', render: (record) => `${record.durationMinutes ?? 0} min` },
  { key: 'points', label: 'Points' },
  { key: 'completedAt', label: 'Completed', render: (record) => formatDate(record.completedAt) },
];

export default function Activities() {
  return (
    <ResourcePage
      columns={columns}
      description="Recent movement logged across the school community."
      resource="activities"
      title="Activities"
    />
  );
}