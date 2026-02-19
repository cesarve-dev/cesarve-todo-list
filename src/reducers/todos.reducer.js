const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',
  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  //reverts todos when requests fail
  revertTodo: 'revertTodo',
  //action on Dismiss Error button
  clearError: 'clearError',
  setSortDirection: 'setSortDirection',
  setSortField: 'setSortField',
  setQueryString: 'setQueryString',
};

const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
  sortDirection: 'desc',
  sortField: 'createdTime',
  queryString: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos: {
      const records = action.records.map((record) => {
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
      return {
        ...state,
        todoList: records,
        isLoading: false,
      };
    }
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    case actions.addTodo: {
      const savedTodo = {
        id: action.records[0].id,
        title: action.records[0].fields.title,
        isCompleted: action.records[0].fields.isCompleted,
      };
      if (!action.records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }
    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };
    case actions.revertTodo: {
      const revertedTodos = state.todoList.map((todo) =>
        todo.id === action.editedTodo.id ? action.originalTodo : todo
      );
      const updatedState = { ...state, todoList: revertedTodos };
      if (action.error) {
        updatedState.errorMessage = action.errorMessage;
      }
      return updatedState;
    }
    case actions.updateTodo: {
      const editedTodos = state.todoList.map((todo) =>
        todo.id === action.editedTodo.id ? action.editedTodo : todo
      );
      const updatedState = { ...state, todoList: editedTodos };
      if (action.error) {
        updatedState.errorMessage = action.errorMessage;
      }
      return updatedState;
    }
    case actions.completeTodo: {
      const completedTodo = state.todoList.map((todo) =>
        todo.id === action.id ? { ...todo, isCompleted: true } : todo
      );
      return {
        ...state,
        todoList: [...completedTodo],
      };
    }
    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };
    case actions.setSortDirection:
      return {
        ...state,
        sortDirection: action.direction,
      };
    case actions.setSortField:
      return {
        ...state,
        sortField: action.sortField,
      };
    case actions.setQueryString:
      return {
        ...state,
        queryString: action.queryString,
      };
  }
}

export { initialState, actions, reducer };
