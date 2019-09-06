import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
      // { label: 'Drink Coffee', important: false, done: false, id: 1 },
      // { label: 'Make Awesome App', important: false, done: false, id: 2 },
      // { label: 'Have a lunch', important: false, done: false, id: 3 }
    ]
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  deleteItem = id => {
    const oldTodoData = [...this.state.todoData];
    const changedTodoList = oldTodoData.filter(todo => todo.id !== id);
    this.setState({
      todoData: changedTodoList
    });
  };

  addItem = text => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      return { todoData: [...todoData, newItem] };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const newArr = [...arr];
    const idx = newArr.findIndex(todo => todo.id === id);
    newArr[idx] = {
      ...newArr[idx],
      [propName]: !newArr[idx][propName]
    };

    return newArr;
  };

  onToggleImportant = id => {
    // const newToDo = [...this.state.todoData];
    // const targetTodoIndex = newToDo.findIndex(todo => todo.id === id);
    // newToDo[targetTodoIndex] = {
    //   ...newToDo[targetTodoIndex],
    //   important: !newToDo[targetTodoIndex].important
    // };

    // this.setState({
    //   todoData: newToDo
    // });
    const stateArray = [...this.state.todoData];
    this.setState({
      todoData: this.toggleProperty(stateArray, id, 'important')
    });
  };

  onToggleDone = id => {
    // const newToDo = [...this.state.todoData];
    // const targetTodoIndex = newToDo.findIndex(todo => todo.id === id);
    // newToDo[targetTodoIndex] = {
    //   ...newToDo[targetTodoIndex],
    //   done: !newToDo[targetTodoIndex].done
    // };

    // this.setState({
    //   todoData: newToDo
    // });
    const stateArray = [...this.state.todoData];
    this.setState({
      todoData: this.toggleProperty(stateArray, id, 'done')
    });
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter(todo => todo.done).length;
    const toDoCount = todoData.filter(todo => !todo.done).length;

    return (
      <div className='todo-app'>
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className='top-panel d-flex'>
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          toggleImportant={this.onToggleImportant}
          toggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
