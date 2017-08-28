import React from 'react';
import '../styles/Todo.css'

const Todo = (props) => {
  console.log(props);

  const showTodo = () => {
    return (
      <div onClick={() => props.handleTodoClick(props.data.id)}>
        {props.data.title} {completedPercent()}
      </div>
    );
  };

  const completedPercent = () => {
    if (props.data.archived) return <span>Archived</span>;
    if (!props.data.todoItems.length) {
      return <span>No steps for this task</span>;
    };
    let completedCount = 0;
    props.data.todoItems.forEach((item) => {
      if (item.complete) {completedCount ++};
    });
    const percentComplete = Math.floor(completedCount / props.data.todoItems.length * 100);
    if (percentComplete === 100) {
      return  <button onClick={() => props.archiveTodo(props.data.id)}>
                Done! Archive?
              </button>;
    }
    return <span>{percentComplete}% completed!</span>
  };

  const showItems = () => {
    return <div>Items</div>;
  };

  if (props.selectedTodo === props.data.id) {
    console.log(props);
    return (
      <div className={'todo' + ((props.data.archived) ? ' archived-todo': '')}>
        {showTodo()}
        {showItems()}
      </div>
    );
  } else {
    return (
      <div className={'todo' + ((props.data.archived) ? ' archived-todo': '')}>
        {showTodo()}
      </div>
    );
  }
};

export default Todo;
