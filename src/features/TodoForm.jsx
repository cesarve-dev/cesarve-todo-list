/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

const TodoForm = ({ onAddTodo }) => {
  const todoTitleInput = useRef(null);
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    // const title = ;
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        elementId="todoTitle"
        labelText="Todo"
      />
      <button disabled={workingTodoTitle === ''}>Add Todo</button>
    </form>
  );
};

export default TodoForm;
