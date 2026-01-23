import { useEffect, useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

/* eslint-disable react/prop-types */
const TodoListItem = ({ todo, onCompleteTodo, onUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(e) {
    e.preventDefault();
    setWorkingTitle(e.target.value);
  }

  function handleUpdate(e) {
    if (isEditing === false) {
      return;
    }
    e.preventDefault();
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
};

export default TodoListItem;
