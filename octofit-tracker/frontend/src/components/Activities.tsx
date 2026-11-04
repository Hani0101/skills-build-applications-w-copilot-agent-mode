import { useEffect, useState } from 'react';
import { getJson, responseItems } from '../api/client.js';

type Activity = { type?: string; minutes?: number; points?: number; date?: string };
export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { getJson<Activity[] | { results?: Activity[] } | { activities?: Activity[] }>('/api/activities/').then((data) => { console.log('Fetched activities', data); setActivities(responseItems(data)); }).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); }, []);
  return <section className="card content-card"><div className="card-body p-4">
    <h2 className="h3 card-title">Activities</h2>
    <p className="text-secondary">Track activity minutes and points across the community.</p>
    {loading ? <p role="status">Loading activities...</p> : error ? <p role="alert" className="alert alert-danger">Unable to load activities: {error}</p> : activities.length ? <div className="table-responsive"><table className="table table-striped table-hover align-middle"><thead className="table-dark"><tr><th scope="col">Type</th><th scope="col">Minutes</th><th scope="col">Points</th><th scope="col">Date</th></tr></thead><tbody>{activities.map((activity, index) => <tr key={index}><td>{activity.type ?? 'Activity'}</td><td>{activity.minutes ?? 0}</td><td><span className="badge text-bg-primary">{activity.points ?? 0}</span></td><td>{activity.date ?? '—'}</td></tr>)}</tbody></table></div> : <p role="status" className="alert alert-info mb-0">No activities found.</p>}
  </div></section>;
}
