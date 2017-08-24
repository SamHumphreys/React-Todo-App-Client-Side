import React from 'react';
import '../styles/Todo.css'

const Todo = (props) => {
  console.log(props);

  const showTodo = () => {
    return (
      <div onClick={() => props.handleTodoClick(props.data.id)}>
        {props.data.title}
      </div>
    );
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
