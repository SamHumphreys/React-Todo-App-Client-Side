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
      return (<button onClick={() => this.handleTodoItemDone(todoItem.todoId, todoItem.id)}>
                  Mark as done...
              </button>)
    } else {
      return (<span>Completed!</span>)
    }
  };

  handleTodoItemDone (todoId, itemId) {
    const options = {
      hostname: 'localhost',
      path: ':8000/api/todos/' + todoId + '/items/' + itemId,
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }
    const req = http.request(options, (res) => {
      let resData = '';
      res.on('error', (err) => console.error(err));
      res.on('data', (data) => {
        resData += data.toString();
      });
      res.on('end', () => {
        const parsedData = JSON.parse(resData);
        let todoItems = this.state.todoItems.slice();
        const itemIndex = todoItems.findIndex((a) => {
          return a.id === parsedData.id
        });
        todoItems[itemIndex] = parsedData;
        this.setState({todoItems});
      });
    });
    req.write('complete=true');
    req.end();
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

  completedPercent () {
    const itemsLength = this.state.todoItems.length;
    if (!itemsLength) {
      return <span>No steps in this task...</span>
    }
    let totalCompleted = 0;
    this.state.todoItems.forEach((item) => {
      if (item.complete) totalCompleted ++;
    })
    const completedPercent = Math.floor(totalCompleted / itemsLength * 100);
    return (
      <span>{completedPercent}% completed!</span>
    );
  };

  showTodoItems () {
    let incompletedItems = [];
    let doneItems = [];
    this.state.todoItems.forEach((item) => {
      if (!item.complete) {
        incompletedItems.push(item)
      } else {
        doneItems.push(item);
      };
    });
    const sortedItemsList = incompletedItems.concat(doneItems);
    if (this.props.todoId === this.props.selectedTodo) {
      return (
        <div className='todo-items'>
          <button onClick={() => this.handleAddTodoItemClicked()}>
            Add a step...
          </button>
          <div className='todo-items-list'>
            {sortedItemsList.map((todoItem) => {
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
  };

  render () {
    return (
      <div>
        {this.completedPercent()}
        {this.showTodoItems()}
      </div>
    )
  }
};
