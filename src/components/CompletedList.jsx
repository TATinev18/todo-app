import React from 'react';
import TodoItem from './TodoItem';
import styles from './CompletedList.module.css';

function CompletedList({ todos, sortOrder, onSortChange, onToggleComplete }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Completed Todos</h2>
      <div className={styles.sortBar}>
        <label>
          Sort by completed date:{' '}
          <select value={sortOrder} onChange={onSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      {todos.length > 0 ? (
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggleComplete={onToggleComplete} />
        ))
      ) : (
        <p>No completed todos</p>
      )}
    </div>
  );
}

export default CompletedList;
