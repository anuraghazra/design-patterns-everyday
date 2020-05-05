// composite design pattern

/*
  interface Component 
  Leaf: Component
  Composite: Component

  use case example which uses canvas:
  https://codesandbox.io/s/composite-pattern-layers-4v079?file=/src/index.js
*/


interface Component {
  remove?: (c: Component) => void;
  add?: (c: Component) => void;
  ls: () => string;
}


class FolderNode implements Component {
  name: string;
  childrens: Component[];
  constructor(name: string) {
    this.name = name;
    this.childrens = []
  }

  add(component: Component) {
    this.childrens.push(component)
  }

  remove(component: Component) {
    this.childrens = this.childrens.filter(
      (c: Component) => c !== component
    )
  }

  ls() {
    let str = '\n---' + this.name
    this.childrens.forEach(child => {
      str += child.ls()
    })
    return str;
  }
}

class FileNode implements Component {
  name: string;
  constructor(name: string) {
    this.name = '\n------' + name;
  }

  ls() {
    return this.name
  }
}


let root = new FolderNode('root');
let src = new FolderNode('src');
let lib = new FolderNode('lib');

let jsFile = new FileNode('app.js');
let htmlFile = new FileNode('index.html');
let cssFile = new FileNode('style.css');
let mainFile = new FileNode('index.js');

src.add(jsFile)
src.add(htmlFile)
src.add(cssFile)
lib.add(mainFile);

root.add(src)
root.add(lib)

// root.remove(lib)

console.log(root.ls())