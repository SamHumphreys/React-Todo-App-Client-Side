import React from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoItem.css';

const TodoItems = (props) => {

  const addItem = () => {
    const itemText = prompt('What is the step to be added?');
    props.sendIt('ADD_ITEM', {todoId: props.todoId, itemText});
  }

  return (
    <div className='todo-items-list'>
      <button onClick={() => addItem()}>Add step...</button>
      {props.todoItems.sort((a,b) => {
        return a.complete - b.complete
      }).map((item) => {
        return <TodoItem key={item.id}
                          todoItem={item}
                          sendIt={props.sendIt} />
      })}
    </div>

  )
};

export default TodoItems;
