import React from 'react';
import '../styles/TodoItem.css';

const TodoItem = (props) => {
  console.log('rendering TodoItem', props);
  return (
    <div className='todo-item'>
      {props.data.content}
    </div>


  )
}

export default TodoItem;
