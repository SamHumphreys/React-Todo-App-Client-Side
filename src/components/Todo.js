import React from 'react';
import TodoItems from './TodoItems';
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

  render () {
    return (
      <div className='todo'
            onClick={() => this.props.handleTodoClick(this.state.todo.id)}>
        {this.state.todo.title}
        {this.completedPercent()}
        <TodoItems todoItems={this.state.todo.todoItems}
                    todoId={this.state.todo.id}
                    selectedTodo={this.props.selectedTodo} />
      </div>
    );
  };
};
