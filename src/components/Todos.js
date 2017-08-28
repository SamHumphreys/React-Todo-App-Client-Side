import React from 'react';
import Todo from './Todo';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTodo: null
    };
  };

  addTodo () {
    const newTask = prompt('What is the task to complete?');
    this.props.addTodo(newTask);
  };

  todoSelected (selectedTodo) {
    if (this.state.selectedTodo !== selectedTodo) {
      this.setState({selectedTodo});
    };
  };

  render () {
    return (
      <div className='todos-list'>
        <button onClick={() => this.addTodo()}>Add a task...</button>
        {this.props.todos.map((todo) => {
          if (!todo.archived) {
            return <Todo key={todo.id}
                      data={todo}
                      handleTodoClick={(id) => this.todoSelected(id)}
                      selectedTodo={this.state.selectedTodo}
                      archiveTodo={this.props.archiveTodo} />
          }
        })}
      </div>
    );
  };
};
