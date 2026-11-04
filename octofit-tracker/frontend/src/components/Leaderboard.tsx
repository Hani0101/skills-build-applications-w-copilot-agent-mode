import { useEffect, useState } from 'react';
import { getJson, responseItems } from '../api/client.js';

type Entry = { teamName?: string; totalPoints?: number; rank?: number };
export default function Leaderboard() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { getJson<Entry[] | { results?: Entry[] } | { leaderboard?: Entry[] }>('/api/leaderboard/').then((data) => { console.log('Fetched leaderboard', data); setEntries(responseItems(data)); }).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); }, []);
  return <section className="card content-card"><div className="card-body p-4">
    <h2 className="h3 card-title">Leaderboard</h2>
    <p className="text-secondary">Celebrate the teams earning the most points.</p>
    {loading ? <p role="status">Loading leaderboard...</p> : error ? <p role="alert" className="alert alert-danger">Unable to load leaderboard: {error}</p> : entries.length ? <div className="table-responsive"><table className="table table-striped table-hover align-middle"><thead className="table-dark"><tr><th scope="col">Rank</th><th scope="col">Team</th><th scope="col">Total points</th></tr></thead><tbody>{entries.map((entry, index) => <tr key={index}><th scope="row">{entry.rank ?? index + 1}</th><td className="fw-semibold">{entry.teamName ?? 'Team'}</td><td><span className="badge text-bg-success">{entry.totalPoints ?? 0}</span></td></tr>)}</tbody></table></div> : <p role="status" className="alert alert-info mb-0">No leaderboard rankings found.</p>}
  </div></section>;
}
