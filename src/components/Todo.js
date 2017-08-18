import React from 'react';
import TodoItem from './TodoItem';
import http from 'http';
import '../styles/Todo.css'


export default class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: this.props.todo
    }
  };

  completedPercent() {
    const todoItemsCount = this.state.todo.todoItems.length;
    if (!todoItemsCount) {
      return <span>No items</span>;
    };
    let totalCompleted = 0;
    this.state.todo.todoItems.forEach((item) => {
      if(item.complete) {
        totalCompleted ++;
      }
    });
    const completedPercent = Math.floor(totalCompleted / todoItemsCount * 100);
    return (
      <span>{completedPercent}% completed!</span>
    );
  };

  addTodoItem() {
    const newTodoItem = prompt('enter Todo Item Details...');
    if (!newTodoItem) return;
    const options = {
      hostname: 'localhost',
      path: ':8000/api/todos/' + this.state.todo.id + '/items',
      method: 'POST',
      headers: {
        'content-type': "application/x-www-form-urlencoded"}
    };
    const req = http.request(options, (res) => {
      res.on('error', (err) => console.error(err));
      res.on('data', (data) => {
        console.log(data.toString());
      });

    });
    req.write('content='+newTodoItem);
    req.end();
  };

  showTodoItems() {
    if (this.props.selectedTodo === this.state.todo.id) {
      return (
        <div className='todo-items'>
          <button onClick={()=> {this.addTodoItem()}}>Add a step...</button>
          {this.state.todo.todoItems.map((todoItem) => {
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

  render () {
    return (
      <div className='todo'
            onClick={() => this.props.handleTodoClick(this.state.todo.id)}>
        {this.state.todo.title}
        {this.completedPercent()}
        {this.showTodoItems()}
      </div>
    );
  };
};
