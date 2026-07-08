import { useMemo, useState } from 'react';
import { type ScheduleItem, type ScheduleItemType } from './data/schedule';
import {
  formatDateTime,
  formatWeek,
  getActiveExamWindows,
  getScheduleItems,
  getUpcomingItems,
  getWeeks,
} from './lib/schedule';

const typeLabels: Record<ScheduleItemType | 'all', string> = {
  all: 'All',
  class: 'Class',
  skills: 'Skills',
  reading: 'Reading',
  assignment: 'Assignment',
  exam: 'Exam',
  deadline: 'Deadline',
  finals: 'Finals',
  rideAlong: 'Ride-along',
};

const typeOptions: Array<ScheduleItemType | 'all'> = [
  'all',
  'class',
  'skills',
  'assignment',
  'exam',
  'deadline',
  'finals',
  'rideAlong',
];

const priorityRank = {
  normal: 0,
  high: 1,
  critical: 2,
};

function itemTime(item: ScheduleItem): string {
  if (item.startsAt && item.endsAt) return `${formatDateTime(item.startsAt)} - ${formatDateTime(item.endsAt)}`;
  if (item.startsAt) return formatDateTime(item.startsAt);
  if (item.dueAt) return `Due ${formatDateTime(item.dueAt)}`;
  return 'No date listed';
}

function App() {
  const [selectedWeek, setSelectedWeek] = useState<ScheduleItem['week'] | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ScheduleItemType | 'all'>('all');
  const [query, setQuery] = useState('');

  const allItems = useMemo(() => getScheduleItems(), []);
  const weeks = useMemo(() => getWeeks(), []);
  const upcomingItems = useMemo(() => getUpcomingItems(new Date(), 4), []);
  const activeExamWindows = useMemo(() => getActiveExamWindows(new Date()), []);

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allItems.filter((item) => {
      const weekMatch = selectedWeek === 'all' || item.week === selectedWeek;
      const typeMatch = selectedType === 'all' || item.type === selectedType;
      const queryMatch =
        normalizedQuery.length === 0 ||
        [item.title, item.module, item.details, item.location].some((value) =>
          value?.toLowerCase().includes(normalizedQuery),
        );

      return weekMatch && typeMatch && queryMatch;
    });
  }, [allItems, query, selectedType, selectedWeek]);

  const criticalItems = useMemo(
    () =>
      allItems
        .filter((item) => (item.priority ? priorityRank[item.priority] : 0) >= priorityRank.high)
        .slice(0, 8),
    [allItems],
  );

  return (
    <main className="shell">
      <section className="hero" aria-labelledby="page-title">
        <div className="hero__content">
          <p className="eyebrow">Static schedule board</p>
          <h1 id="page-title">UCLA EMT course schedule</h1>
          <p className="hero__copy">
            A fast, sanitized course timeline for lectures, skills days, exam windows, finals, and completion milestones.
          </p>
          <div className="hero__actions" aria-label="Primary schedule actions">
            <a href="#schedule" className="button button--primary">Open schedule</a>
            <a href="#deadlines" className="button button--ghost">Review deadlines</a>
          </div>
        </div>
        <div className="hero__panel" aria-label="Current schedule status">
          <span className="panel__label">Next up</span>
          {upcomingItems[0] ? (
            <>
              <strong>{upcomingItems[0].title}</strong>
              <span>{itemTime(upcomingItems[0])}</span>
            </>
          ) : (
            <>
              <strong>Course timeline complete</strong>
              <span>Check official course systems for updates.</span>
            </>
          )}
        </div>
      </section>

      <section className="notice" aria-label="Data notice">
        <strong>Sanitized data only.</strong>
        <span>No access codes, personal documents, Canvas mirror files, PDFs, screenshots, or lecture media are included. Verify dates against the official course source.</span>
      </section>

      <section className="overview" aria-label="Schedule overview">
        <div>
          <span className="metric">{allItems.length}</span>
          <span className="metric-label">tracked items</span>
        </div>
        <div>
          <span className="metric">9</span>
          <span className="metric-label">instructional weeks</span>
        </div>
        <div>
          <span className="metric">6</span>
          <span className="metric-label">unit exam windows</span>
        </div>
        <div>
          <span className="metric">Aug 30</span>
          <span className="metric-label">finals testing</span>
        </div>
      </section>

      <section id="deadlines" className="split" aria-label="Urgent schedule context">
        <div>
          <p className="eyebrow">Active windows</p>
          <h2>Exam status</h2>
          {activeExamWindows.length > 0 ? (
            <div className="stack">
              {activeExamWindows.map((item) => (
                <article className="deadline deadline--active" key={item.id}>
                  <span>{item.module}</span>
                  <h3>{item.title}</h3>
                  <p>{itemTime(item)}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="quiet">No exam window is active for the browser's current date.</p>
          )}
        </div>
        <div>
          <p className="eyebrow">High priority</p>
          <h2>Deadlines and requirements</h2>
          <div className="stack">
            {criticalItems.map((item) => (
              <article className="deadline" key={item.id}>
                <span>{formatWeek(item.week)} / {typeLabels[item.type]}</span>
                <h3>{item.title}</h3>
                <p>{itemTime(item)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="schedule" aria-labelledby="schedule-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Worklist</p>
            <h2 id="schedule-title">Course timeline</h2>
          </div>
          <p>Filter by week, item type, or keyword. The layout is intentionally static so it can deploy cleanly on GitHub Pages.</p>
        </div>

        <div className="filters" aria-label="Schedule filters">
          <label>
            <span>Week</span>
            <select value={String(selectedWeek)} onChange={(event) => {
              const value = event.target.value;
              setSelectedWeek(value === 'all' ? 'all' : value === 'pre' || value === 'finals' || value === 'completion' ? value : Number(value));
            }}>
              <option value="all">All weeks</option>
              {weeks.map((week) => (
                <option value={String(week)} key={String(week)}>{formatWeek(week)}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Type</span>
            <select value={selectedType} onChange={(event) => setSelectedType(event.target.value as ScheduleItemType | 'all')}>
              {typeOptions.map((type) => (
                <option value={type} key={type}>{typeLabels[type]}</option>
              ))}
            </select>
          </label>
          <label className="search">
            <span>Search</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Respiratory, exam, skills..." />
          </label>
        </div>

        <div className="timeline">
          {visibleItems.map((item) => (
            <article className={`timeline-item timeline-item--${item.type}`} key={item.id}>
              <div className="timeline-item__rail">
                <span>{formatWeek(item.week)}</span>
                <strong>{typeLabels[item.type]}</strong>
              </div>
              <div className="timeline-item__body">
                <div>
                  <h3>{item.title}</h3>
                  <p className="time">{itemTime(item)}</p>
                </div>
                <p>{item.details}</p>
                <div className="meta">
                  {item.module && <span>{item.module}</span>}
                  {item.location && <span>{item.location}</span>}
                  {item.priority && <span className={`priority priority--${item.priority}`}>{item.priority}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
