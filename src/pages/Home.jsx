import React, { useEffect, useState } from 'react';
import { fetchTodos } from '../api/todos';
import UncompletedList from '../components/UncompletedList';
import CompletedList from '../components/CompletedList';
import styles from './Home.module.css';

function Home() {
  const [todos, setTodos] = useState([]);
  const [filterUser, setFilterUser] = useState(0);
  const [incompleteSortOrder, setIncompleteSortOrder] = useState('asc');
  const [completedSortOrder, setCompletedSortOrder] = useState('asc');
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    fetchTodos().then(data => {
      const todosWithDates = data.map(todo => ({
        ...todo,
        completedDate: todo.completed ? new Date() : null
      }));
      setTodos(todosWithDates);
    });
  }, []);

  const filteredTodos = todos.filter(todo =>
    filterUser === 0 ? true : todo.userId === filterUser
  );

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);
  const completedTodos = filteredTodos.filter(todo => todo.completed);

  const sortedIncomplete = [...incompleteTodos].sort((a, b) =>
    incompleteSortOrder === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  const sortedCompleted = [...completedTodos].sort((a, b) => {
    if (!a.completedDate || !b.completedDate) return 0;
    return completedSortOrder === 'asc'
      ? a.completedDate - b.completedDate
      : b.completedDate - a.completedDate;
  });

  const visibleIncomplete = sortedIncomplete.slice(0, visibleCount);
  const hasMoreIncomplete = sortedIncomplete.length > visibleCount;

  const handleFilterChange = e => setFilterUser(Number(e.target.value));
  const handleSortIncomplete = e => setIncompleteSortOrder(e.target.value);
  const handleSortCompleted = e => setCompletedSortOrder(e.target.value);
  const handleLoadMore = () => setVisibleCount(c => c + 20);
  const handleToggleComplete = id => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id !== id
          ? todo
          : todo.completed
          ? { ...todo, completed: false, completedDate: null }
          : { ...todo, completed: true, completedDate: new Date() }
      )
    );
  };

  const userIds = Array.from(new Set(todos.map(t => t.userId)));

  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <label>
          Filter by User:{' '}
          <select value={filterUser} onChange={handleFilterChange}>
            <option value={0}>All</option>
            {userIds.sort((a, b) => a - b).map(u => (
              <option key={u} value={u}>
                User {u}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.listsContainer}>
        <div className={styles.listColumn}>
          <UncompletedList
            todos={visibleIncomplete}
            sortOrder={incompleteSortOrder}
            onSortChange={handleSortIncomplete}
            onToggleComplete={handleToggleComplete}
            onLoadMore={handleLoadMore}
            hasMore={hasMoreIncomplete}
          />
        </div>
        <div className={styles.listColumn}>
          <CompletedList
            todos={sortedCompleted}
            sortOrder={completedSortOrder}
            onSortChange={handleSortCompleted}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
