import React from 'react';
import Todo from './Todo';

const Todos = (props) => {

  const addTodo = () => {
    const newTodo = prompt('What is the task to complete?');
    if (newTodo) {
      props.sendIt('ADD_TODO', {newTodo});
    };
  };

  const selectTodos = () => {
    let todosToShow = [];
    if (props.showActive === 'all') {
      todosToShow = props.todos;
    } else {
      props.todos.forEach((todo) => {
        if (!todo.archived) {
          todosToShow.push(todo);
        };
      });
    };
    return todosToShow;
  };

  return (
    <div className='todos-list'>
      <button onClick={() => addTodo()}>Add a task...</button>
      <button onClick={() => props.handleShowActiveClick()}>
        {props.showActive === 'all' ? 'Hide archived tasks': 'Show archived tasks'}
      </button>
      {selectTodos().map((todo) => {
        return <Todo key={todo.id}
                      data={todo}
                      handleTodoClick={props.handleTodoClick}
                      sendIt={props.sendIt}
                      selectedTodo={props.selectedTodo} />})}
    </div>
  );
};

export default Todos;
