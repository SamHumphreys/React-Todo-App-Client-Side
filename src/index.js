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
      if (newTodos === this.state.todos || newTodos === undefined) return;
      this.setState({todos: newTodos}, () => {
        console.log('state after queryServer update', this.state);
      });
    });
  };

  render () {
    console.log('render', this.state);
    if (this.state.todos) {
      return (
        <Todos todos={this.state.todos}
                sendIt={(action, data) => this.queryServer(action, data)}
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
