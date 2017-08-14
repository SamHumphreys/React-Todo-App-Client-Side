import React from 'react';
import TodoItem from './TodoItem';
import '../styles/Todo.css'

export default function Todo (props) {

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
      {showTodoItems()}
    </div>
  )
};
