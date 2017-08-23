import React from 'react';

const Todos = (props) => {
  console.log(props);
  return (
    <div className='todos-list'>
      {props.todos.map((todo) => {
        return ('hello')
      })}
    </div>

  )
};

export default Todos;
