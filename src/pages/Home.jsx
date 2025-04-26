import React, { useEffect, useState } from 'react';
import { fetchTodos } from '../api/todos';
import { fetchUsers } from '../api/users';
import UncompletedList from '../components/UncompletedList';
import CompletedList from '../components/CompletedList';
import styles from './Home.module.css';

function Home() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState(0);
  const [incompleteSortOrder, setIncompleteSortOrder] = useState('asc');
  const [completedSortOrder, setCompletedSortOrder] = useState('asc');
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    fetchUsers().then(setUsers);
    fetchTodos().then(data =>
      setTodos(
        data.map(t => ({
          ...t,
          completedDate: t.completed ? new Date() : null
        }))
      )
    );
  }, []);

  const filtered = todos.filter(
    t => filterUser === 0 || t.userId === filterUser
  );

  const incomplete = filtered.filter(t => !t.completed);
  const completed = filtered.filter(t => t.completed);

  const sortedIncomplete = [...incomplete].sort((a, b) =>
    incompleteSortOrder === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  const sortedCompleted = [...completed].sort((a, b) => {
    if (!a.completedDate || !b.completedDate) return 0;
    return completedSortOrder === 'asc'
      ? a.completedDate - b.completedDate
      : b.completedDate - a.completedDate;
  });

  const visible = sortedIncomplete.slice(0, visibleCount);
  const hasMore = sortedIncomplete.length > visibleCount;

  const toggle = id =>
    setTodos(ts =>
      ts.map(t =>
        t.id !== id
          ? t
          : t.completed
          ? { ...t, completed: false, completedDate: null }
          : { ...t, completed: true, completedDate: new Date() }
      )
    );

  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <label>
          Filter by User:{' '}
          <select
            value={filterUser}
            onChange={e => setFilterUser(+e.target.value)}
          >
            <option value={0}>All</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.listsContainer}>
        <div className={styles.listColumn}>
          <UncompletedList
            todos={visible}
            sortOrder={incompleteSortOrder}
            onSortChange={e => setIncompleteSortOrder(e.target.value)}
            onToggleComplete={toggle}
            onLoadMore={() => setVisibleCount(v => v + 20)}
            hasMore={hasMore}
          />
        </div>
        <div className={styles.listColumn}>
          <CompletedList
            todos={sortedCompleted}
            sortOrder={completedSortOrder}
            onSortChange={e => setCompletedSortOrder(e.target.value)}
            onToggleComplete={toggle}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
