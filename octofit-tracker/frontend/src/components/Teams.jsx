import ResourcePage from './ResourcePage.jsx';

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'members', label: 'Roster', render: (record) => `${record.members?.length ?? 0} members` },
  { key: 'createdAt', label: 'Created', render: (record) => record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'Not set' },
];

export default function Teams() {
  return (
    <ResourcePage
      columns={columns}
      description="Teams building consistency together."
      resource="teams"
      title="Teams"
    />
  );
}
