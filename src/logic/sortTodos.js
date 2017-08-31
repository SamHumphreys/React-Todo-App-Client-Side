const sortTodos = (todos) => {

  //sort todos
  let active = [];
  let archived = [];

  todos.forEach((item) => {
    if (item.archived) {
      archived.push(item);
    } else {
      active.push(item);
    };
  });
  active.sort((a,b) => {
    return a.id - b.id;
  });
  archived.sort((a,b) => {
    return a.id - b.id;
  });
  const sortedTodos = active.concat(archived);

  // sort todo items
  sortedTodos.forEach((todo) => {
    let completed = [];
    let incompleted = [];
    todo.todoItems.forEach((item) => {
      if (item.completed) {
        completed.push(item);
      } else {
        incompleted.push(item);
      };
    })
    incompleted.sort((a,b) => {
      return a.id - b.id;
    });
    completed.sort((a,b) => {
      return a.id - b.id;
    });
    todo.todoItems = incompleted.concat(completed);
  });
  return sortedTodos;
};

export default sortTodos;
