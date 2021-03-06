import React from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoItem.css';

const TodoItems = (props) => {

  const addItem = () => {
    const itemText = prompt('What is the step to be added?');
    if (itemText) {
      props.sendIt('ADD_ITEM', {todoId: props.todoId, itemText});
    };
  }

  return (
    <div className='todo-items-list'>
      {!props.archived ?
        <button onClick={() => addItem()}>Add step...</button> : ''
      }
      {props.todoItems.map((item) => {
        return <TodoItem key={item.id}
                          todoItem={item}
                          sendIt={props.sendIt} />
      })}
    </div>

  )
};

export default TodoItems;
