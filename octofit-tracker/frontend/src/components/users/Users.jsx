import ResourcePage from '../ResourcePage.jsx';

const columns = [
  { key: 'displayName', label: 'Athlete' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
];

export default function Users() {
  return (
    <ResourcePage
      columns={columns}
      description="Profiles participating in the OctoFit community."
      resource="users"
      title="Users"
    />
  );
}