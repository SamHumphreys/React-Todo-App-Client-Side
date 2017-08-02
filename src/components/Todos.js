import React from 'react';
import http from 'http';
import Todo from './Todo';

export default class Todos extends React.Component {


  constructor () {
    super();
    this.state = {
      todos: null,
      selected: null
    };
    this.showTodos = this.showTodos.bind(this);
  };

  componentWillMount() {
    http.get('http://localhost:8000/api/todos', (res) => {
      res.on('data', (todos) => {
        this.setState({todos: JSON.parse(todos.toString())});
      });
    });
  };

  showTodos () {
    this.state.todos.map((todo) => {
      return (
        <Todo key={todo.id}
                      data={todo}
                      onTodoClick={(index) => this.handleTodoClick(index)}
                      selected={this.state.selected} />
      )
    })
  };

  handleTodoClick (selected) {
    this.setState({selected});
  };

  render () {
    if (!this.state.todos) {
      return <div>Loading spinner...</div>
    };

    return (
      <div className='todo-list'>
        {this.showTodos()}
      </div>
    );
  };
};
