const TodoForm = () => {
  return (
    <form>
      <label htmlFor="todoTile">Todo</label>
      <input id="todoTitle" type="text" />
      <button>Add Todo</button>
    </form>
  );
};

export default TodoForm;
