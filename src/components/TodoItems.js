import React from 'react';
import '../styles/TodoItem.css'

export default class TodoItems extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      todoItems: props.todoItems
    };
  };

  checkIfDone (todoItem) {
    if (!todoItem.complete) {
      return (<button>Mark as done..</button>)
    } else {
      return (<span>Completed!</span>)
    }
  };

  showTodoItems () {
    if (this.props.todoId === this.props.selectedTodo) {
      return (
        <div className='todo-items'>
          <button>Add a step...</button>
          <div className='todo-items-list'>
            {this.state.todoItems.map((todoItem) => {
              return <div className='todoItem'
                            key={todoItem.id}>
                {todoItem.content}
                {this.checkIfDone(todoItem)}
              </div>
            })}
          </div>
        </div>

      )
    } else {return null}
  }

  render () {
    return (
      this.showTodoItems()

    )
  }
};
