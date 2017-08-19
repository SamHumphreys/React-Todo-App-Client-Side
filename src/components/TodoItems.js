import React from 'react';
import '../styles/TodoItem.css'

export default class TodoItems extends React.Component {

  constructor (props) {
    super (props);
    console.log(props);
    this.state = {
      todoItems: props.todoItems
    }
  };

  checkIfDone (todoItem) {
    if (!todoItem.complete) {
      return (<button>Mark as done..</button>)
    } else {
      return (<span>Completed!</span>)
    }
  };

  render () {
    return (
      <div className='todo-items-list'>
        {this.state.todoItems.map((todoItem) => {
          console.log(todoItem);
          return (
            <div className='todoItem'
                  key={todoItem.id}>
              {todoItem.content}
              {this.checkIfDone(todoItem)}
            </div>


          )
        })}
      </div>
    )
  }
};
