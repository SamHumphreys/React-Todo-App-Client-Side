import React from 'react';
import '../styles/Todo.css'

const Todo = (props) => {

  const showTodo = () => {
    return (
      <div onClick={() => props.handleTodoClick(props.data.id)}>
        {props.data.title} {completedPercent()}
      </div>
    );
  };

  const completedPercent = () => {
    console.log(props);
    if (!props.data.todoItems.length) {
      return <span>No steps for this task</span>;
    };
    let completedCount = 0;
    props.data.todoItems.forEach((item) => {
      if (item.complete) {completedCount ++};
    });
    const percentComplete = Math.floor(completedCount / props.data.todoItems.length * 100);
    console.log(percentComplete);
    return <span>{percentComplete}% completed!</span>
  };

  const showItems = () => {
    return <div>Items</div>;
  };

  if (props.selectedTodo === props.data.id) {
    return (
      <div className='todo'>
        {showTodo()}
        {showItems()}
      </div>
    )
  } else {
    return showTodo()
  }
};

export default Todo;
