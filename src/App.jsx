import { useEffect, useCallback, useReducer } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import TodosViewForm from './features/TodosViewForm.jsx';
import styles from './App.module.css';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodoState,
} from './reducers/todos.reducer.js';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodoState);
  const sortDirection = todoState.sortDirection;
  const sortField = todoState.sortField;
  const queryString = todoState.queryString;

  const setSortDirection = function (direction) {
    dispatch({ type: todoActions.setSortDirection, direction });
  };

  const setSortField = function (sortField) {
    dispatch({ type: todoActions.setSortField, sortField });
  };

  const setQueryString = (queryString) => {
    dispatch({ type: todoActions.setQueryString, queryString });
  };

  const encodeUrl = useCallback(() => {
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = {
        method: 'GET',
        headers: { Authorization: token },
      };

      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) {
          throw new Error(`Request failed: ${resp.status}`);
        }
        const data = await resp.json();
        dispatch({ type: todoActions.loadTodos, records: data.records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      } finally {
        dispatch({ type: todoActions.endRequest });
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, queryString]);

  const completeTodo = async (id) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);
    const completeTodo = todoState.todoList.find((todo) => todo.id === id);
    const payload = {
      records: [
        {
          id: completeTodo.id,
          fields: {
            title: completeTodo.title,
            isCompleted: true,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      dispatch({ type: todoActions.completeTodo, id });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
      dispatch({ type: todoActions.revertTodo, id, originalTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo,
            isCompleted: false,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        console.log(resp.status);
        throw new Error(resp.status);
      }
      const { records } = await resp.json();
      dispatch({ type: todoActions.addTodo, records });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      dispatch({ type: todoActions.updateTodo, editedTodo });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
      dispatch({
        type: todoActions.revertTodo,
        id: editedTodo.id,
        originalTodo,
      });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  return (
    <div className={styles.container}>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />
      <TodoList
        todoList={todoState.todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
      />
      {todoState.errorMessage !== '' && (
        <div className={styles.errorMessage}>
          <hr />
          <p>{todoState.errorMessage}</p>
          <button
            type="button"
            onClick={() => dispatch({ type: todoActions.clearError })}
          >
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
    </div>
  );
}

export default App;
