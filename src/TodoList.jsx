import TodoListItem from './TodoListItem.jsx';

function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        todoList.map((todo) => <TodoListItem key={todo.id} todo={todo} />)
      )}
    </ul>
  );
}

export default TodoList;
