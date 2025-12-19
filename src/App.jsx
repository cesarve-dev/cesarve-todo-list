import { useState } from 'react';
import './App.css';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';

function App() {
  const [newTodo, setNewTodo] = useState('Example text');

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm />
      {newTodo}
      <TodoList />
    </div>
  );
}

export default App;
