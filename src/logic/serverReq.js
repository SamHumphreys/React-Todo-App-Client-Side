import reqRes from './req-res';

// get: (path, callback)
//request: (path, method, payload, callback)

const serverReq = (action, data, state, callback) => {
  switch (action) {
    case 'GET_TODOS':
      callback(getTodos());
      break;
    default:
      return callback(state);
  }
};

export default serverReq;

const getTodos = () => {
  const path = 'http://localhost:8000/api/todos';
  reqRes.get(path, (todos) => {
    todos.sort((a,b) => {
      return a.id - b.id
    });
    console.log(todos);
    return todos;
  });
}