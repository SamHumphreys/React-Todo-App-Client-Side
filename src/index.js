import React from 'react';
import ReactDOM from 'react-dom';
import TodosList from './components/TodosList';

class App extends React.Component {

  render () {
    return (
      <div className='App'>
        <TodosList />
      </div>
    )
  }
};

ReactDOM.render(
  <App/>,
  document.getElementById('App')
);
