import React from 'react';
import ReactDOM from 'react-dom';
import Todos from './components/Todos';
import reqRes from './logic/req-res';

class App extends React.Component {

  constructor () {
    super ();
    this.state = {
      todos: null
    }
  };

  componentWillMount () {
    const path = 'http://localhost:8000/api/todos';
    reqRes.get(path, (todos) => {
      todos.sort((a,b) => {
        return a.id - b.id
      });
      let activeTodos = [];
      this.setState({todos});
    });
  };

  addTodo (newTodo) {
    const path = ':8000/api/todos';
    const method = 'POST';
    const payload = 'title=' + newTodo;
    reqRes.request (path, method, payload, (newTodo) => {
      const arrNewTodo = [newTodo];
      const newStateTodos = this.state.todos.concat(arrNewTodo);
      this.setState({todos: newStateTodos});
    });
  };

  archiveTodo (id) {
    const path = ':8000/api/todos/' + id;
    const method = 'PUT';
    const payload = 'archived=true';
    reqRes.request(path, method, payload, (updatedTodo) => {
      console.log(updatedTodo);
      const stateTodos = this.state.todos.concat();
      console.log('state', this.state.todos);
      console.log();

    })
  }

  render () {
    if (this.state.todos) {
      return (
        <Todos todos={this.state.todos}
                addTodo={(newTodo) => this.addTodo(newTodo)}
                archiveTodo={(id) => this.archiveTodo(id)} />
      );
    } else {
      return (
        <div>Loading spinner....</div>
      )
    }
  };
};

ReactDOM.render(
  <App />,
  document.getElementById('App')
);
