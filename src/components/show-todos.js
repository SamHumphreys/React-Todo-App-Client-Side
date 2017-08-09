import React from 'react';
import http from 'http';

export default class ShowTodos extends React.Component {

  constructor () {
    super();

    this.state = {
      line: 'hello'
    };
  };

  componentWillMount () {

    const path = 'http://localhost:8000/api/todos';

    http.get(path, (res) => {
      const serverRes = JSON.parse(res);
    });

  };

  render () {
    return (
      <div>
        {this.state.line}
      </div>
    )
  }

};
