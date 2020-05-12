// Chain of responsibility
import { consoleColor } from '../utils';

interface IHandler {
  addMiddleware(h: IHandler): IHandler;
  get(url: string, callback: (data: any) => void): void
}

abstract class AbstractHandler implements IHandler {
  next: IHandler;
  addMiddleware(h: IHandler) {
    this.next = h;
    return this.next
  }

  get(url: string, callback: (data: any) => void) {
    if (this.next) {
      return this.next.get(url, callback)
    }
  }
}


class Auth extends AbstractHandler {
  isAuthenticated: boolean;
  constructor(username: string, password: string) {
    super()

    this.isAuthenticated = false;
    if (username === 'anuraghazra' && password === 'password123') {
      this.isAuthenticated = true;
    }
  }

  get(url: string, callback: (data: any) => void) {
    if (this.isAuthenticated) {
      return super.get(url, callback)
    } else {
      throw new Error('Not Authorized')
    }
  }
}

class Logger extends AbstractHandler {
  get(url: string, callback: (data: any) => void) {
    consoleColor('green', '/GET Request to: ', url)
    return super.get(url, callback)
  }
}

class Route extends AbstractHandler {
  url: string;
  URLMaps: {};
  constructor() {
    super();
    this.URLMaps = {
      '/api/todos': [{ title: 'hello' }, { title: 'world' }],
      '/api/random': Math.random()
    }
  }

  get(url: string, callback: (data: any) => void) {
    super.get(url, callback);

    if (this.URLMaps.hasOwnProperty(url)) {
      callback(this.URLMaps[url])
    }
  }
}

const route = new Route();
route
  .addMiddleware(new Auth('anuraghazra', 'password123'))
  .addMiddleware(new Logger());

route.get('/api/todos', (data) => {
  consoleColor('blue', JSON.stringify({ data }, null, 2))
})
route.get('/api/random', (data) => {
  console.log(data)
})


export { }