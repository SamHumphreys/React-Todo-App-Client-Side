const sortTodos = (todos) => {
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

  return sortedTodos;
};

export default sortTodos;
