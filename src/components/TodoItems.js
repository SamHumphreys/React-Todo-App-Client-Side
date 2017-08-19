import React from 'react';
import http from 'http';
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

  handleAddTodoItemClicked () {
    const newTodoItem = prompt('enter Todo Item Details...');
    if (!newTodoItem) return;
    const options = {
      hostname: 'localhost',
      path: ':8000/api/todos/' + this.props.todoId + '/items',
      method: 'POST',
      headers: {
        'content-type': "application/x-www-form-urlencoded"}
    };
    const req = http.request(options, (res) => {
      res.on('error', (err) => console.error(err));
      res.on('data', (data) => {
        const newItem = JSON.parse(data);
        let todoItems = JSON.parse(JSON.stringify(this.state.todoItems));
        todoItems.push(newItem);
        this.setState({todoItems});
      });
    });
    req.write('content='+newTodoItem);
    req.end();

  };

  showTodoItems () {
    if (this.props.todoId === this.props.selectedTodo) {
      return (
        <div className='todo-items'>
          <button onClick={() => this.handleAddTodoItemClicked()}>
            Add a step...
          </button>
          <div className='todo-items-list'>
            {this.state.todoItems.map((todoItem) => {
              return <div className='todo-item'
                            key={todoItem.id}>
                {todoItem.content}
                {this.checkIfDone(todoItem)}
              </div>
            })}
          </div>
        </div>
      )
    } else {return null}
  };

  render () {
    return (
      this.showTodoItems()
    )
  }
};
