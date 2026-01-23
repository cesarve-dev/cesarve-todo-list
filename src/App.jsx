import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = {
        method: 'GET',
        headers: { Authorization: token },
      };

      try {
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const data = await resp.json();
        const records = data.records.map((record) => {
          const todo = {
            title: record.fields.title,
            id: record.id,
            isCompleted: record.fields.isCompleted,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });
        setTodoList([...records]);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // function completeTodo(id) {
  //   const updatedTodos = todoList.map((todo) => {
  //     if (todo.id === id) {
  //       return { ...todo, isCompleted: true };
  //     }
  //     return todo;
  //   });

  //   setTodoList(updatedTodos);
  // }
  //set isCompleted key to value TRUE
  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);
    const completeTodo = todoList.find((todo) => todo.id === id);
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
      setIsSaving(true);
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      const completedTodo = todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      );
      setTodoList(completedTodo);
    } catch (error) {
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) =>
        todo.id === id ? originalTodo : todo
      );

      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
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
      setIsSaving(true);
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: records[0].fields.isCompleted,
      };

      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }

      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    // console.log(originalTodo);

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
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      const editedTodos = todoList.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      );
      // console.log(editedTodo);
      setTodoList(editedTodos);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(`${error.message}. Reverting todo...`);
      //reverse to original todolist
      const revertedTodos = todoList.map((todo) => {
        todo.id === editedTodo.id ? originalTodo : todo;
      });
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />
      {errorMessage !== '' && (
        <>
          <hr />
          <p>{errorMessage}</p>
          <button type="button" onClick={() => setErrorMessage('')}>
            dismiss
          </button>
        </>
      )}
    </div>
  );
}

export default App;
