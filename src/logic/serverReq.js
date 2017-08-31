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
    return callback(sortedTodos);
  });
};

const addTodo = (state, data, callback) => {
  const path = ':8000/api/todos';
  const method = 'POST';
  const payload = 'title=' + data.newTodo;
  reqRes.request (path, method, payload, (newTodo) => {
    let newStateTodos = JSON.parse(JSON.stringify(state));
    newStateTodos.push(newTodo);
    const sortedTodos = sortTodos(newStateTodos);
    return callback(sortedTodos);
  });
};

const archiveTodo = (state, data, callback) => {
  const path = ':8000/api/todos/' + data.todoId;
  const method = 'PUT';
  const payload = 'archived=true';
  reqRes.request (path, method, payload, (updatedTodo) => {
    let newStateTodos = JSON.parse(JSON.stringify(state));
    const updatedIndex = newStateTodos.findIndex((element) => {
      return element.id === updatedTodo.id
    });
    newStateTodos[updatedIndex] = updatedTodo;
    const sortedTodos = sortTodos(newStateTodos);
    return callback(sortedTodos);
  });
};

const addItem = (state, data, callback) => {
  //ADD_ITEM {todoId: 80, itemText: "hello"}
  const path = ':8000/api/todos/' + data.todoId +'/items';
  const method = 'POST';
  const payload = 'content=' + data.itemText;
  reqRes.request(path, method, payload, (newItem) => {
    let newStateTodos = JSON.parse(JSON.stringify(state));
    const updateTodoIndex = newStateTodos.findIndex((element) => {
      return element.id === newItem.todoId;
    });
    newStateTodos[updateTodoIndex].todoItems.push(newItem);
    const sortedTodos = sortTodos(newStateTodos);
    return callback(sortedTodos);
  });
};

const archiveItem = (state, data, callback) => {
  // 'ARCHIVE_ITEM', {todoId: props.todoItem.todoId, itemId: props.todoItem.id}
  const path = ':8000/api/todos/' + data.todoId + '/items/' + data.itemId;
  const method = 'PUT';
  const payload = 'complete=true';
  reqRes.request(path, method, payload, (updatedItem) => {
    let newStateTodos = JSON.parse(JSON.stringify(state));
    const updateTodoIndex = newStateTodos.findIndex((element) => {
      return element.id === updatedItem.todoId;
    });
    const updateItemIndex = newStateTodos[updateTodoIndex].todoItems.findIndex((item) => {
      return updatedItem.id === item.id;
    });
    newStateTodos[updateTodoIndex].todoItems[updateItemIndex] = updatedItem;
    const sortedTodos = sortTodos(newStateTodos);
    return callback(sortedTodos);
  });
};
