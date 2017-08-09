import React from 'react';
import ReactDOM from 'react-dom';
import ShowTodos from './components/show-todos';

class App extends React.Component {

  render () {
    return (
      <div className='App'>
        <ShowTodos />
      </div>
    )
  }
};

ReactDOM.render(
  <App/>,
  document.getElementById('App')
);
