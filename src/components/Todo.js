import React from 'react';
import TodoItems from './TodoItems';
import '../styles/Todo.css'


export default class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: this.props.todo,
      completedPercent: 0
    }
  };

  render () {
    return (
      <div className='todo'
            onClick={() => this.props.handleTodoClick(this.state.todo.id)}>
        {this.state.todo.title}
        <TodoItems todoItems={this.state.todo.todoItems}
                    todoId={this.state.todo.id}
                    selectedTodo={this.props.selectedTodo} />
      </div>
    );
  };
};
