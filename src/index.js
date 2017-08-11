import React from 'react';
import ReactDOM from 'react-dom';
import http from 'http';

class Todos extends React.Component {

  constructor() {
    super();
    this.state = {
      todos: null
    }
  };

  componentWillMount () {
    http.get('http://localhost:8000/api/todos', (res) => {
      res.on('error', (err) => console.error(err));
      res.on('data', (todos) => {
        this.setState({todos: JSON.parse(todos.toString())});
      });
    });
  };

  listTodos () {
    return (
      this.state.todos.map((todo) => {
        console.log(todo);
        return (
          <div className='todo'
                key={todo.id}>
            {todo.title}
          </div>
        )
      })
    );
  }


  render () {
    if (!this.state.todos) {
      return (
        <div className='show-todos'>
          loading spinner...
        </div>
      )
    };
    return (
      <div className='todos-list'>
        {this.listTodos()}
      </div>
    )
  }
};

ReactDOM.render(
  <Todos />,
  document.getElementById('App')
);
