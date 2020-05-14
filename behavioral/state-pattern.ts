// state pattern
import { consoleColor } from "../utils";

/*
  EXAMPLE 1: Phone Alert States
  show different menu options depending on FileType
*/
interface IAlertState {
  alert(state: any): void;
}

class AlertStateContext {
  currentState: any;
  constructor() {
    this.currentState = new General()
  }

  setState(state: any) {
    this.currentState = state;
  }

  alert() {
    this.currentState.alert(this);
  }
}

class Vibration implements IAlertState {
  alert(context: AlertStateContext) {
    console.log('Phone is: Bruuu bruuu bruuu bruuu');
  }
}

class General implements IAlertState {
  alert(context: AlertStateContext) {
    console.log('Phone is: ring ring ring ring');
  }
}

class Silent implements IAlertState {
  alert(context: AlertStateContext) {
    console.log('Phone is: .... .... .... ....');
  }
}


consoleColor('magenta', '---- EXAMPLE 1: Phone Alert States')
let phone = new AlertStateContext();

phone.alert();
phone.setState(new Vibration())
phone.alert();
phone.setState(new Silent())
phone.alert();
console.log('\n')

/*
  EXAMPLE 2: File Manager Context Menu
  show different menu options depending on FileType
*/
interface IFileManagerState {
  openContextMenu(state: any): void;
}

class FileManager {
  currentState: any;
  constructor() {
    this.currentState = null
  }

  setState(state: any) {
    this.currentState = state;
  }

  openContextMenu() {
    this.currentState.openContextMenu(this);
  }
}

class TextFile implements IFileManagerState {
  openContextMenu(context: any) {
    console.log(`
    Context menu of a text file
    - Edit on Notepad
    - Delete
    - Rename
    `)
  }
}

class VideoFile implements IFileManagerState {
  openContextMenu(context: any) {
    console.log(`
    Context menu of a video file
    - Play with VLC Player
    - Delete
    - Rename
    `)
  }
}

consoleColor('magenta', '---- EXAMPLE 2: FileManager Context Menu')
let explorer = new FileManager();

explorer.setState(new TextFile());
explorer.openContextMenu();
explorer.setState(new VideoFile());
explorer.openContextMenu();




/*
  EXAMPLE 3: SIMPLE TOGGLE
*/

interface IToggleState {
  toggle(state: IToggleState): void
}

class ToggleContext {
  currentState: any;
  constructor() {
    this.currentState = new Off();
  }

  setState(state: IToggleState) {
    this.currentState = state;
  }

  toggle() {
    this.currentState.toggle(this)
  }

}

class Off implements IToggleState {
  toggle(ctx: ToggleContext) {
    consoleColor('red', 'OFF')
    ctx.setState(new On())
  }
}
class On implements IToggleState {
  toggle(ctx: ToggleContext) {
    consoleColor('green', 'ON')
    ctx.setState(new Off())
  }
}


consoleColor('magenta', '---- EXAMPLE 3: Toggle Switch')
let button = new ToggleContext();
button.toggle();
button.toggle();
button.toggle();
button.toggle();

export { }