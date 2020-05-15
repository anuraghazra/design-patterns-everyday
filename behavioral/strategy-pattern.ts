// Strategy pattern
import { consoleColor } from "../utils";


interface IStrategy {
  authenticate(...args: any): any;
}

class Authenticator {
  strategy: any;
  constructor() {
    this.strategy = null;
  }

  setStrategy(strategy: any) {
    this.strategy = strategy
  }

  authenticate(...args: any) {
    if (!this.strategy) {
      consoleColor('red', 'No Authentication strategy provided')
      return
    }
    return this.strategy.authenticate(...args);
  }
}


class GoogleStrategy implements IStrategy {
  authenticate(googleToken: string) {
    if (googleToken !== '12345') {
      consoleColor('red', 'Invalid Google User');
      return
    }
    consoleColor('green', 'Authenticated with Google')
  }
}

class LocalStrategy implements IStrategy {
  authenticate(username: string, password: string) {
    if (username !== 'johnwick' && password !== 'gunslotsofguns') {
      consoleColor('red', 'Invalid user. you are `Excommunicado`');;
      return
    }
    consoleColor('green', 'Authenticated as Baba Yaga');
  }
}


const auth = new Authenticator();

auth.setStrategy(new GoogleStrategy())
auth.authenticate('invalidpass')

auth.setStrategy(new GoogleStrategy())
auth.authenticate('12345')

auth.setStrategy(new LocalStrategy())
auth.authenticate('anurag', '12345');

auth.setStrategy(new LocalStrategy())
auth.authenticate('johnwick', 'gunslotsofguns')