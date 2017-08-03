import React from 'react';
import http from 'http';
import ShowTodo from './ShowTodo';

export default class Todos extends React.Component {


  constructor () {
    super();
    this.state = {
      todos: null,
      selected: null
    };
  };

  componentWillMount() {
    http.get('http://localhost:8000/api/todos', (res) => {
      res.on('data', (todos) => {
        this.setState({todos: JSON.parse(todos.toString())});
      });
    });
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
        {this.state.todos.map((todo) => {
          return <ShowTodo key={todo.id}
                  data={todo}
                  onTodoClick={(index) => this.handleTodoClick(index)}
                  selected={this.state.selected}>
                  Hello
          </ShowTodo>
        })}
      </div>
    );
  };
};
