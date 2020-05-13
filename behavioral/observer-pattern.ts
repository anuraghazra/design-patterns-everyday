// Observer pattern

import { consoleColor } from "../utils";

interface IPublisher {
  addSubscriber(subscriber: any): void;
  removeSubscriber(subscriber: any): void;
  notifyObservers(): void
}
interface IObserver {
  notify(payload: any): void
}

class Publisher implements IPublisher {
  subscribers: IObserver[];
  state: any;
  constructor(state: any = {}) {
    this.subscribers = [];
    this.state = state
  }

  addSubscriber(subscriber: IObserver) {
    if (this.subscribers.includes(subscriber)) return;
    this.subscribers.push(subscriber);
  }

  removeSubscriber(subscriber: IObserver) {
    if (!this.subscribers.includes(subscriber)) return;
    let index = this.subscribers.indexOf(subscriber);
    this.subscribers.splice(index, 1);
  }

  notifyObservers() {
    this.subscribers.forEach(subs => {
      subs.notify(this.state);
    });
  }


  setState(newState: any) {
    this.state = newState;
    this.notifyObservers()
  }
}

class UserInterface implements IObserver {
  renderTodos(todos) {
    console.clear();
    todos.forEach(todo => {
      consoleColor('cyan', '-----')
      consoleColor(
        todo.isCompleted ? 'green' : 'red',
        `${todo.title} ${todo.isCompleted ? '[DONE]' : '[PENDING]'}`
      )
      consoleColor('cyan', '-----')
    })
  }

  notify(state: any) {
    this.renderTodos(state.todos)
  }
}

const store = new Publisher({
  todos: [
    { title: 'hello', isCompleted: false, id: 1 },
    { title: 'world', isCompleted: false, id: 2 }
  ]
});

const userInterface = new UserInterface()
store.addSubscriber(userInterface);

// just some testing

// add todo
store.setState({
  todos: [
    ...store.state.todos,
    { title: 'new item', id: Math.random() }
  ]
});

// remove todo
setTimeout(() => {
  store.setState({
    todos: store.state.todos.filter(t => t.id !== 2)
  });
}, 1000)

// update todo
setTimeout(() => {
  store.setState({
    todos: store.state.todos.map(t => {
      if (t.id === 1) {
        (t.isCompleted = true)
      }
      return t;
    })
  });
}, 2000)

export { }