/* eslint-disable react/prop-types */
import { useRef } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const todoTitleInput = useRef('');

  function handleAddTodo(event) {
    event.preventDefault();
    const title = event.target.title.value;
    onAddTodo(title);
    event.target.title.value = '';
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTile">Todo</label>
      <input id="todoTitle" type="text" name="title" ref={todoTitleInput} />
      <button>Add Todo</button>
    </form>
  );
};

export default TodoForm;
