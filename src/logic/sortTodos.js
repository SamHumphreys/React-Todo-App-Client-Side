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
    if (a.id - b.id < 0) return -1;
    if (a.id - b.id > 0) return 1;
    return 0;
  });
  archived.sort((a,b) => {
    if (a.id - b.id < 0) return -1;
    if (a.id - b.id > 0) return 1;
    return 0;
  });
  let sortedTodos = active.concat(archived);

  // sort todo items
  sortedTodos.forEach((todo) => {
    let completed = [];
    let incompleted = [];
    todo.todoItems.forEach((item) => {
      if (item.complete) {
        completed.push(item);
      } else {
        incompleted.push(item);
      };
    })
    incompleted.sort((a,b) => {
      if (a.id - b.id < 0) return -1;
      if (a.id - b.id > 0) return 1;
      return 0;
    });
    completed.sort((a,b) => {
      if (a.id - b.id < 0) return -1;
      if (a.id - b.id > 0) return 1;
      return 0;
    });
    todo.todoItems = incompleted.concat(completed);
  });
  return sortedTodos;
};

export default sortTodos;
