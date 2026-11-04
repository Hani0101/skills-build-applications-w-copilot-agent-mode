import { useEffect, useState } from 'react';
import { getJson, responseItems } from '../api/client.js';

type User = { name?: string; email?: string; fitnessGoal?: string };

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { getJson<User[] | { results?: User[] } | { users?: User[] }>('/api/users/').then((data) => { console.log('Fetched users', data); setUsers(responseItems(data)); }).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); }, []);
  return <section className="card content-card"><div className="card-body p-4">
    <h2 className="h3 card-title">Users</h2>
    <p className="text-secondary">Explore members and their fitness goals.</p>
    {loading ? <p role="status">Loading users...</p> : error ? <p role="alert" className="alert alert-danger">Unable to load users: {error}</p> : users.length ? <div className="table-responsive"><table className="table table-striped table-hover align-middle"><thead className="table-dark"><tr><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Fitness goal</th></tr></thead><tbody>{users.map((user, index) => <tr key={index}><td className="fw-semibold">{user.name ?? 'Unnamed user'}</td><td><a className="link-primary" href={`mailto:${user.email ?? ''}`}>{user.email ?? '—'}</a></td><td>{user.fitnessGoal ?? '—'}</td></tr>)}</tbody></table></div> : <p role="status" className="alert alert-info mb-0">No users found.</p>}
  </div></section>;
}
