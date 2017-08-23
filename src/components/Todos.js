import React from 'react';

const Todos = (props) => {
  console.log(props);

  const addTodo = () => {
    const newTask = prompt('What is the task to complete?');
    props.addTodo(newTask);
  };

  return (
    <div className='todos-list'>
      <button onClick={() => addTodo()}>Add a task...</button>
      {props.todos.map((todo) => {
        return <div key={todo.id}>{todo.id}</div>
      })}
    </div>
  )
};

export default Todos;
