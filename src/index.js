import React from 'react';
import ReactDOM from 'react-dom';
import Todos from './components/Todos';
import serverReq from './logic/serverReq';

class App extends React.Component {
  constructor () {
    super ();
    this.state = {
      todos: null
    }
  };

  componentWillMount () {
    this.queryServer('GET_TODOS', null);

    // const path = 'http://localhost:8000/api/todos';
    // reqRes.get(path, (todos) => {
    //   todos.sort((a,b) => {
    //     return a.id - b.id
    //   });
    //   this.setState({todos});
    // });
  };

  addTodo (newTodo) {
    // const path = ':8000/api/todos';
    // const method = 'POST';
    // const payload = 'title=' + newTodo;
    // reqRes.request (path, method, payload, (newTodo) => {
    //   let newStateTodos = JSON.parse(JSON.stringify(this.state.todos));
    //   newStateTodos.push(newTodo);
    //   this.setState({todos: newStateTodos});
    // });
  };

  archiveTodo (id) {
    // const path = ':8000/api/todos/' + id;
    // const method = 'PUT';
    // const payload = 'archived=true';
    // reqRes.request(path, method, payload, (updatedTodo) => {
    //   const stateTodos = JSON.parse(JSON.stringify(this.state.todos));
    //   const updatedIndex = stateTodos.findIndex((element) => {
    //     return element.id === updatedTodo.id;
    //   });
    //   stateTodos[updatedIndex] = updatedTodo;
    //   this.setState({todos: stateTodos});
    // });
  };

  addTodoItem (id, itemText) {
    // const path = ':8000/api/todos/' + id + '/items';
    // const method = 'POST';
    // const payload = 'content=' + itemText;
    // reqRes.request(path, method, payload, (todoItem) => {
    //   const stateTodos = JSON.parse(JSON.stringify(this.state.todos));
    //   const todoIndex = stateTodos.findIndex((element) => {
    //     return element.id === todoItem.todoId;
    //   });
    //   stateTodos[todoIndex].todoItems.push(todoItem);
    //   this.setState({todos: stateTodos});
    // });
  };

  queryServer (action, data) {
    console.log(action, data);
    serverReq(action, data, this.state.todos, (newTodos) => {
      console.log('from server', newTodos);
      console.log('state', this.state);
      if (newTodos === this.state.todos) return;
      this.setState({todos: newTodos}, () => {
        console.log('refreshed state', this.state);
      });
    });
  };

  render () {
    console.log('render', this.state);
    if (this.state.todos) {
      return (
        <Todos todos={this.state.todos}
                sendIt={(action, data) => this.queryServer(action, data)}
                addTodo={(newTodo) => this.addTodo(newTodo)}
                archiveTodo={(id) => this.archiveTodo(id)}
                addTodoItem={(id, itemText) => this.addTodoItem(id, itemText)} />
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
