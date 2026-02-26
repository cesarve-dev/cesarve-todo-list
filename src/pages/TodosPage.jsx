/* eslint-disable react/prop-types */
import TodoList from '../features/TodoList/TodoList.jsx';
import TodoForm from '../features/TodoForm.jsx';
import TodosViewForm from '../features/TodosViewForm.jsx';
import styles from '../App.module.css';
// import { actions as todoActions } from './reducers/todos.reducer.js';

const TodosPage = ({
  onAddTodo,
  todoState,
  onCompleteTodo,
  onUpdateTodo,
  isSaving,
  isLoading,
  sortDirection,
  sortField,
  setSortDirection,
  setSortField,
  queryString,
  setQueryString,
  onClearError,
}) => {
  return (
    <>
      <TodoForm onAddTodo={onAddTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoState.todoList}
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo}
        isLoading={isLoading}
      />
      {todoState.errorMessage !== '' && (
        <div className={styles.errorMessage}>
          <hr />
          <p>{todoState.errorMessage}</p>
          <button type="button" onClick={() => onClearError()}>
            dismiss
          </button>
        </div>
      )}
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        sortField={sortField}
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </>
  );
};

export default TodosPage;
