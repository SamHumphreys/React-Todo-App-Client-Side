import React from 'react';
import ReactDOM from 'react-dom';
import Todos from './components/Todos';
import serverReq from './logic/serverReq';

class App extends React.Component {
  constructor () {
    super ();
    this.state = {
      todos: null,
      selectedTodo: null,
      showActive: 'all'
    }
  };

  componentWillMount () {
    this.queryServer('GET_TODOS', null);
  };

  // handleShowActiveClick () {
  //   console.log('show active clicked');
  // };

  queryServer (action, data) {
    serverReq(action, data, this.state, (newState) => {
      if (newState === this.state || newState === undefined) return;
      this.setState(newState, () => {
      });
    });
  };

  render () {
    if (this.state.todos) {
      return (
        <Todos
          todos={this.state.todos}
          sendIt={(action, data) => this.queryServer(action, data)}
          handleTodoClick={(id) => this.setState(this.state.selectedTodo ?
                                                  {selectedTodo: null} :
                                                  {selectedTodo:id})}
          selectedTodo={this.state.selectedTodo}
          handleShowActiveClick={() => this.setState(this.state.showActive === 'all' ?
                                                      {showActive: 'active'} :
                                                      {showActive: 'all'})}
          showActive={this.state.showActive} />
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
