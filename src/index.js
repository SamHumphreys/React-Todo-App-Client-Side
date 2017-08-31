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

  queryServer (action, data) {
    serverReq(action, data, this.state.todos, (newTodos) => {
      if (newTodos === this.state.todos || newTodos === undefined) return;
      this.setState({todos: newTodos}, () => {
      });
    });
  };

  render () {
    if (this.state.todos) {
      return (
        <Todos todos={this.state.todos}
                sendIt={(action, data) => this.queryServer(action, data)} />
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
