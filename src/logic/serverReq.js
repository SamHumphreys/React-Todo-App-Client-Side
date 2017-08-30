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
    newStateTodos = sortTodos(newStateTodos);
    return callback(newStateTodos);
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
    newStateTodos = sortTodos(newStateTodos);
    return callback(newStateTodos);
  });
}
