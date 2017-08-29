import React from 'react';

const TodoItemsList = (props) => {

  const addItem = () => {
    const itemText = prompt('What is the step to be added?');
    props.addTodoItem(props.todoId, itemText);
  }
  
  return (
    <div className='todo-items-list'>
      <button onClick={() => addItem()}>Add step...</button>
      <div>Items list</div>
    </div>

  )
};

export default TodoItemsList;
