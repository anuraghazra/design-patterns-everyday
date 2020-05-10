// command pattern

/*

  Interface Command


*/


interface ICommand {
  undo?(payload?: any): any;
  execute(payload?: any): any
}

abstract class Command implements ICommand {
  calc: Calculator;
  constructor(calc?: Calculator) {
    this.calc = calc;
  }

  execute() { }
}


class Calculator {
  currentValue: number;
  history: CommandHistory;
  constructor() {
    this.history = new CommandHistory()
    this.currentValue = 0;
  }

  getValue(): number {
    return this.currentValue
  }

  execute(command: ICommand) {
    this.currentValue = command.execute(this.currentValue)
    this.history.add(command);
  }

  undo() {
    let lastCommand = this.history.remove();
    if (lastCommand) {
      this.currentValue = lastCommand.undo(this.currentValue);
    }
  }
}

class CommandHistory {
  commands: ICommand[];
  constructor() {
    this.commands = [];
  }

  add(command: ICommand) {
    this.commands.push(command)
  }

  remove() {
    return this.commands.pop()
  }
}

class AddCommand {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
  execute(value: number) {
    return value + this.value
  }
  undo(value: number) {
    return value - this.value
  }
}
class SubCommand {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
  execute(value: number) {
    return value - this.value
  }
  undo(value: number) {
    return value + this.value
  }
}
const calc = new Calculator();

calc.execute(new AddCommand(50));
calc.execute(new AddCommand(50));
calc.execute(new SubCommand(10));
calc.execute(new AddCommand(10));

console.log(calc.getValue())
calc.undo(); // undo last command
calc.undo(); // undo last command
calc.undo(); // undo last command
console.log(calc.getValue())