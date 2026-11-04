import { useEffect, useState } from 'react';
import { getJson, responseItems } from '../api/client.js';

type Workout = { title?: string; reason?: string; focus?: string };
export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('mona@example.com');
  useEffect(() => { getJson<Workout[] | { results?: Workout[] } | { suggestions?: Workout[] }>(`/api/workouts/suggestions/${encodeURIComponent(email)}`).then((data) => { console.log('Fetched workouts', data); setWorkouts(responseItems(data)); }).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); }, []);
  return <section className="card content-card"><div className="card-body p-4">
    <h2 className="h3 card-title">Workout suggestions</h2>
    <p className="text-secondary">Find a workout matched to your activity patterns.</p>
    <form className="row g-2 align-items-end mb-4" onSubmit={(event) => { event.preventDefault(); setLoading(true); setError(''); getJson<Workout[] | { results?: Workout[] } | { suggestions?: Workout[] }>(`/api/workouts/suggestions/${encodeURIComponent(email)}`).then((data) => { console.log('Fetched workouts', data); setWorkouts(responseItems(data)); }).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); }}>
      <div className="col-md-8"><label className="form-label" htmlFor="workout-email">User email</label><input id="workout-email" className="form-control" type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div>
      <div className="col-md-4"><button className="btn btn-primary w-100" type="submit">Get suggestions</button></div>
    </form>
    {loading ? <p role="status">Loading workout suggestions...</p> : error ? <p role="alert" className="alert alert-danger">Unable to load workouts: {error}</p> : workouts.length ? <div className="table-responsive"><table className="table table-striped table-hover align-middle"><thead className="table-dark"><tr><th scope="col">Workout</th><th scope="col">Focus</th><th scope="col">Reason</th></tr></thead><tbody>{workouts.map((workout, index) => <tr key={index}><td className="fw-semibold">{workout.title ?? 'Workout'}</td><td><span className="badge text-bg-info">{workout.focus ?? 'General'}</span></td><td>{workout.reason ?? 'Recommended for your goals.'}</td></tr>)}</tbody></table></div> : <p role="status" className="alert alert-info mb-0">No workout suggestions found.</p>}
  </div></section>;
}
