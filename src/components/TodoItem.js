import React from 'react';

const TodoItem = (props) => {

  console.log(props);

  const itemStatus = () => {
    if (props.todoItem.complete) {
      return <span>Done!</span>
    } else {
      return (
        <button onClick={() => props.sendIt('ARCHIVE_ITEM', {todoId: props.todoItem.todoId,
                                                        itemId: props.todoItem.id})}>
          Archive?
        </button>
      )
    }
  };
  

  return (
    <div className={'todo-item' + (props.todoItem.complete ? ' archived-item': '')}>
      {props.todoItem.content}
      {itemStatus()}
    </div>
  )
};

export default TodoItem;
