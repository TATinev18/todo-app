import React from 'react';
import TodoItem from './TodoItem';
import styles from './UncompletedList.module.css';

function UncompletedList({ todos, sortOrder, onSortChange, onToggleComplete, onLoadMore, hasMore }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Uncompleted Todos</h2>
      <div className={styles.sortBar}>
        <label>
          Sort by title:{' '}
          <select value={sortOrder} onChange={onSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      {todos.length > 0 ? (
        <>
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggleComplete={onToggleComplete} />
          ))}
          {hasMore && (
            <button className={styles.loadMore} onClick={onLoadMore}>
              Load more
            </button>
          )}
        </>
      ) : (
        <p>No uncompleted todos</p>
      )}
    </div>
  );
}

export default UncompletedList;
