import React from 'react';
import ReactDOM from 'react-dom';
import Todos from './components/Todos';

class App extends React.Component {

  render () {
    return (
      <div className='App'>
        <Todos />
      </div>
    )
  }
};

ReactDOM.render(
  <App/>,
  document.getElementById('App')
);
