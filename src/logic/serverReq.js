import reqRes from './req-res';
import sortTodos from './sortTodos';

// get: (path, callback)
//request: (path, method, payload, callback)

const serverReq = (action, data, state, callback) => {
  switch (action) {
    case 'GET_TODOS':
      callback(getTodos(callback));
      break;
    case 'ADD_TODO':
      callback(addTodo(state, data, callback));
      break;
    case 'ARCHIVE_TODO':
      callback(archiveTodo(state, data, callback));
      break;
    case 'ADD_ITEM':
      callback(addItem(state, data, callback));
      break;
    case 'ARCHIVE_ITEM':
      callback(archiveItem(state, data, callback));
      break;
    default:
      return callback(state);
  }
};

export default serverReq;

const getTodos = (callback) => {
  const path = 'http://localhost:8000/api/todos';
  reqRes.get(path, (todos) => {
    const sortedTodos = sortTodos(todos);
    const newState = {
      todos: sortedTodos,
      selectedTodo: null,
      showActive: 'all'
    }
    return callback(newState);
  });
};

const addTodo = (state, data, callback) => {
  const path = ':8000/api/todos';
  const method = 'POST';
  const payload = 'title=' + data.newTodo;
  reqRes.request (path, method, payload, (newTodo) => {
    let newStateTodos = JSON.parse(JSON.stringify(state.todos));
    newStateTodos.push(newTodo);
    const sortedTodos = sortTodos(newStateTodos);
    const newState = {
      selectedTodo: newTodo.id,
      todos: sortedTodos,
      showActive: state.showActive
    };
    return callback(newState);
  });
};

const archiveTodo = (state, data, callback) => {
  const path = ':8000/api/todos/' + data.todoId;
  const method = 'PUT';
  const payload = 'archived=true';
  reqRes.request (path, method, payload, (updatedTodo) => {
    let newStateTodos = JSON.parse(JSON.stringify(state.todos));
    const updatedIndex = newStateTodos.findIndex((element) => {
      return element.id === updatedTodo.id
    });
    newStateTodos[updatedIndex] = updatedTodo;
    const sortedTodos = sortTodos(newStateTodos);
    const newState = {
      selectedTodo: null,
      todos: sortedTodos,
      showActive: state.showActive
    };
    return callback(newState);
  });
};

const addItem = (state, data, callback) => {
  const path = ':8000/api/todos/' + data.todoId +'/items';
  const method = 'POST';
  const payload = 'content=' + data.itemText;
  reqRes.request(path, method, payload, (newItem) => {
    let newStateTodos = JSON.parse(JSON.stringify(state.todos));
    const updateTodoIndex = newStateTodos.findIndex((element) => {
      return element.id === newItem.todoId;
    });
    newStateTodos[updateTodoIndex].todoItems.push(newItem);
    const sortedTodos = sortTodos(newStateTodos);
    const newState = {
      selectedTodo: state.selectedTodo,
      todos: sortedTodos,
      showActive: state.showActive
    };
    return callback(newState);
  });
};

const archiveItem = (state, data, callback) => {
  // 'ARCHIVE_ITEM', {todoId: props.todoItem.todoId, itemId: props.todoItem.id}
  const path = ':8000/api/todos/' + data.todoId + '/items/' + data.itemId;
  const method = 'PUT';
  const payload = 'complete=true';
  reqRes.request(path, method, payload, (updatedItem) => {
    let newStateTodos = JSON.parse(JSON.stringify(state.todos));
    const updateTodoIndex = newStateTodos.findIndex((element) => {
      return element.id === updatedItem.todoId;
    });
    const updateItemIndex = newStateTodos[updateTodoIndex].todoItems.findIndex((item) => {
      return updatedItem.id === item.id;
    });
    newStateTodos[updateTodoIndex].todoItems[updateItemIndex] = updatedItem;
    const sortedTodos = sortTodos(newStateTodos);
    const newState = {
      selectedTodo: state.selectedTodo,
      todos: sortedTodos,
      showActive: state.showActive
    };
    return callback(newState);
  });
};
