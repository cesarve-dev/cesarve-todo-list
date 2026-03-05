/* eslint-disable react/prop-types */
import { useSearchParams, useNavigate } from 'react-router';
import TodoListItem from './TodoListItem.jsx';
import styles from './TodoList.module.css';
import { useEffect } from 'react';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter(
    (todo) => todo.isCompleted === false
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 5; // limited to 5 for testing purposes
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const indexOfLastTodo = indexOfFirstTodo + itemsPerPage;
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  const currentTodos = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );
  const navigate = useNavigate();

  function handlePreviousPage() {
    setSearchParams({ page: currentPage - 1 });
  }

  function handleNextPage() {
    setSearchParams({ page: currentPage + 1 });
  }

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <>
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : (
        <ul className={styles.list}>
          {currentTodos.length === 0 ? (
            <p>Add todo above to get started</p>
          ) : (
            currentTodos.map((todo) => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
            ))
          )}
        </ul>
      )}
      {/* Navigation UI */}
      <div className={styles.paginationControls}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

export default TodoList;
