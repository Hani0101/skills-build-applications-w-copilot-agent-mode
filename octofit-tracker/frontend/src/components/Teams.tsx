import { useEffect, useState } from 'react';
import { getJson, responseItems } from '../api/client.js';

type Team = { name?: string; mascot?: string; members?: unknown[] };
export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { getJson<Team[] | { results?: Team[] } | { teams?: Team[] }>('/api/teams/').then((data) => { console.log('Fetched teams', data); setTeams(responseItems(data)); }).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); }, []);
  return <section className="card content-card"><div className="card-body p-4">
    <h2 className="h3 card-title">Teams</h2>
    <p className="text-secondary">See each team&apos;s identity and community size.</p>
    {loading ? <p role="status">Loading teams...</p> : error ? <p role="alert" className="alert alert-danger">Unable to load teams: {error}</p> : teams.length ? <div className="table-responsive"><table className="table table-striped table-hover align-middle"><thead className="table-dark"><tr><th scope="col">Team</th><th scope="col">Mascot</th><th scope="col">Members</th></tr></thead><tbody>{teams.map((team, index) => <tr key={index}><td className="fw-semibold">{team.name ?? 'Unnamed team'}</td><td>{team.mascot ?? '—'}</td><td>{team.members?.length ?? 0}</td></tr>)}</tbody></table></div> : <p role="status" className="alert alert-info mb-0">No teams found.</p>}
  </div></section>;
}
