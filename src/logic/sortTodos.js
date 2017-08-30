const sortTodos = (todos) => {
  todos.sort((a,b) => {
    return a.id - b.id;
  });
  todos.sort((a,b) => {
    return a.archived - b.archived;
  });
  return todos;
};

export default sortTodos;
