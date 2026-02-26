/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const TodoForm = ({ onAddTodo, isSaving }) => {
  const todoTitleInput = useRef(null);
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        elementId="todoTitle"
        labelText="Todo"
      />
      <button disabled={workingTodoTitle.trim() === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 75%;
  }
  button {
    color: #e0e1dd;
    font-weight: bold;
    border-radius: 5px;
    background-color: hsl(12, 62%, 68%);
  }
  button:disabled {
    font-style: italic;
    font-weight: 300;
    background-color: hsl(12, 35%, 68%);
  }
`;
export default TodoForm;
