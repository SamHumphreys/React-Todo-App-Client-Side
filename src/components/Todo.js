import React from 'react';
import TodoItem from './TodoItem';
import '../styles/Todo.css'

export default function Todo (props) {

  const completedPercent = () => {
    const todoItemsCount = props.data.todoItems.length;
    if (!todoItemsCount) {
      return <span>No items</span>;
    };
    let totalCompleted = 0;
    props.data.todoItems.forEach((item) => {
      if(item.complete) {
        totalCompleted ++;
      }
    });
    const completedPercent = Math.floor(totalCompleted / todoItemsCount * 100);
    console.log(completedPercent);
    return (
      <span>{completedPercent}% completed!</span>
    );
  };

  const showTodoItems = () => {
    if (props.selectedTodo === props.data.id) {
      return (
        <div className='todo-items'>
          <button>add todo item</button>
          {props.data.todoItems.map((todoItem) => {
            return (
              <TodoItem className='todo-item'
                          key={todoItem.id}
                          data={todoItem} />
            )
          })}
        </div>
      );
    };
  };

  return (
    <div className='todo'
          onClick={() => props.handleTodoClick(props.data.id)}>
      {props.data.title}
      {completedPercent()}
      {showTodoItems()}
    </div>
  )
};
