import reqRes from './req-res';

// get: (path, callback)
//request: (path, method, payload, callback)

const serverReq = (action, data, state, callback) => {
  switch (action) {
    case 'GET_TODOS':
      callback(getTodos(callback));
      break;
    default:
      return callback(state);
  }
};

export default serverReq;

const getTodos = (callback) => {
  const path = 'http://localhost:8000/api/todos';
  reqRes.get(path, (todos) => {
    todos.sort((a,b) => {
      return a.id - b.id
    });
    return callback(todos);
  });
}
