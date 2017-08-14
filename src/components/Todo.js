import React from 'react';

export default function Todo (props) {
  if (props.selectedTodo === props.data.id) {
    console.log('selected props', props);
  };
  return (
    <div className='todo'
          onClick={() => props.handleTodoClick(props.data.id)}>
      {props.data.title}
    </div>
  )
};
