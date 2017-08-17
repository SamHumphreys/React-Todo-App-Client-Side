import React from 'react';
import '../styles/TodoItem.css'

export default function TodoItem (props) {

  const checkIfDone = () => {
    if (!props.data.complete) {
      return (<button>Mark as done..</button>)
    } else {
      return (<span>Completed!</span>)
    }
  };
  
  return (
    <div className='todo-item'>
      {props.data.content}
      {checkIfDone()}
    </div>
  )
};
