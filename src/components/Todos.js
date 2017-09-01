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
    const newTodo = prompt('What is the task to complete?');
    if (newTodo) {
      this.props.sendIt('ADD_TODO', {newTodo});
    };
  };

  todoSelected (selectedTodo) {
    if (this.state.selectedTodo === selectedTodo) {
      this.setState({selectedTodo: null})
    } else {
      this.setState({selectedTodo});
    };
  };

  render () {
    return (
      <div className='todos-list'>
        <button onClick={() => this.addTodo()}>Add a task...</button>
        <button>show active</button>
        {this.props.todos.map((todo) => {
            return <Todo key={todo.id}
                      data={todo}
                      handleTodoClick={this.props.handleTodoClick}
                      sendIt={this.props.sendIt}
                      selectedTodo={this.props.selectedTodo} />
        })}
      </div>
    );
  };
};
