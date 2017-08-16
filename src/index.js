import React from 'react';
import ReactDOM from 'react-dom';
import http from 'http';
import Todo from './components/Todo';

class Todos extends React.Component {

  constructor () {
    super ();
    this.state = {
      todos: null,
      selectedTodo: null
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

  handleTodoClick (selectedTodo) {
    if (this.state.selectedTodo !== selectedTodo) {
      this.setState({selectedTodo});
    };
  };

  listTodos () {
    return (
      this.state.todos.map((todo) => {
        return <Todo key={todo.id}
                      todo={todo}
                      selectedTodo={this.state.selectedTodo}
                      handleTodoClick={(id) => this.handleTodoClick(id)} />
      })
    );
  };

  handleAddTodoClick () {
    console.log('add todo clicked');
  };

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
        <button onClick={() => this.handleAddTodoClick()}>Add Todo</button>
        {this.listTodos()}
      </div>
    )
  }
};

ReactDOM.render(
  <Todos />,
  document.getElementById('App')
);
