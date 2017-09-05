import React from 'react';
import Todo from './Todo';

const Todos = (props) => {

  const addTodo = () => {
    const newTodo = prompt('What is the task to complete?');
    if (newTodo) {
      props.sendIt('ADD_TODO', {newTodo});
    };
  };

  return (
    <div className='todos-list'>
      <button onClick={() => addTodo()}>Add a task...</button>
      <button>show active</button>
      {props.todos.map((todo) => {
          return <Todo key={todo.id}
                    data={todo}
                    handleTodoClick={props.handleTodoClick}
                    sendIt={props.sendIt}
                    selectedTodo={props.selectedTodo} />
      })}
    </div>
  );
};

export default Todos;
