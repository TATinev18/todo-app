import React from 'react';
import styles from './TodoItem.module.css';

function TodoItem({ todo, onToggleComplete }) {
  const handleToggle = () => onToggleComplete(todo.id);
  const dateStr = todo.completedDate ? todo.completedDate.toLocaleString() : '';
  return (
    <div className={styles.todoItem}>
      <div className={styles.row}>
        <span className={todo.completed ? styles.completedTitle : styles.incompleteTitle}>
          {todo.title}
        </span>
        <button
          className={`${styles.toggleButton} ${todo.completed ? styles.uncomplete : styles.complete}`}
          onClick={handleToggle}
        >
          {todo.completed ? 'Uncomplete' : 'Complete'}
        </button>
      </div>
      {todo.completed && <div className={styles.completedDate}>Completed on: {dateStr}</div>}
    </div>
  );
}

export default TodoItem;
