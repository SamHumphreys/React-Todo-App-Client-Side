import React from 'react';
import TodoItem from './TodoItem';
import '../styles/Todo.css';

export default class Todo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  };

  showCompletedPercent () {
    const todoItems = this.props.data.todoItems;
    let completedItems = 0;
    let completedPercent;

    if (todoItems.length === 0) {
      completedPercent = '?';
    } else {
      todoItems.forEach((item) => {
        if (item.complete) {
          completedItems ++;
        };
      });
      completedPercent = Math.floor(completedItems / todoItems.length * 100);
    };
    return completedPercent + ' % completed';
  };

  showTodoItems () {
    if (this.props.selected === this.props.data.id) {
      if (this.props.data.todoItems.length === 0) {
        return (
          <div className='todo-items-list'>
            No items for this todo...
          </div>
        )
      } else {
        return (
          <div className='todo-items-list'>
            {this.props.data.todoItems.map((todoItem) => {
              return <TodoItem data={todoItem}
                                key={todoItem.id} />
            })}
          </div>
        );
      };
    } else {
      return <div className='todo-items-list'>
      </div>;
    };
  };

  render () {
    return (
      <div className='todo'
            onClick={() => this.props.onTodoClick(this.props.data.id)}>
        {this.props.data.title}
        <span className='completed'>
          {this.showCompletedPercent()}
        </span>
        {this.showTodoItems()}
      </div>
    );
  };
};
