import React from 'react';
import '../styles/TodoItem.css'

export default function TodoItem (props) {
  return (
    <div className='todo-item'>
      {props.data.content}
      <button>done!</button>
    </div>
  )
};
