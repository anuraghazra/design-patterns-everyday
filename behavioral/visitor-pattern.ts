// Visitor pattern
import { consoleColor } from "../utils"

// EXAMPLE 1: AST Modification ---
let ast = [{
  type: 'ELEMENT_NODE',
  childrens: [
    {
      type: 'FUNCTION_NODE',
      value: () => 'hello world'
    },
    {
      type: 'FUNCTION_NODE',
      value: () => 'this is a func node'
    },
    {
      type: 'ELEMENT_NODE',
      childrens: [{
        type: 'TEXT_NODE',
        value: 'nested elm'
      }]
    },
  ]
}]

interface IASTVisitor {
  visitTextNode(node: any): void
  visitElementNode(node: any): void
  visitFunctionNode(node: any): void
}

class Visitor implements IASTVisitor {
  traverse(ast: any[]) {
    const traverseRecusive = (nodes: any[]) => {
      nodes.forEach(node => {
        switch (node.type) {
          case 'TEXT_NODE':
            this.visitTextNode(node)
            break;
          case 'ELEMENT_NODE':
            this.visitElementNode(node)
            break;
          case 'FUNCTION_NODE':
            this.visitFunctionNode(node)
            break;
          default:
            break;
        }
        if (node.childrens) {
          traverseRecusive(node.childrens)
        }
      });
    }

    traverseRecusive(ast);
    return ast;
  }

  visitTextNode(node: any) { }
  visitElementNode(node: any) { }
  visitFunctionNode(node: any) { }
}

class TreeVisitor extends Visitor {
  visitTextNode(node: any) {
    node.value += '_modified'
  }
  visitElementNode(node: any) {
    // do nothing
  }
  visitFunctionNode(node: any) {
    // convert all function nodes to text nodes
    node.value = node.value()
    node.type = 'TEXT_NODE';
  }
}

const treeVisitor = new TreeVisitor();

let modifiedAst = treeVisitor.traverse(ast);
let secondPass = treeVisitor.traverse(modifiedAst);

consoleColor('magenta', 'EXAMPLE 1: AST Modification ---')
consoleColor('yellow', secondPass);



// EXAMPLE 2: SVG/Canvas Exporter ---

interface Shape {
  draw(): void;
  accept(visitor: any): void;
}

class Rect implements Shape {
  pos: { x: number; y: number }
  dim: { w: number; h: number }
  constructor(x: number, y: number, w: number, h: number) {
    this.pos = { x, y }
    this.dim = { w, h }
  }

  draw() {
    console.log(`
      \rrect drawn 
      \rx:${this.pos.x} y:${this.pos.y}
      \rw:${this.dim.w} h:${this.dim.h}
    `)
  }

  accept(visitor: any) {
    visitor.visitRect(this)
  }
}

class Circle implements Shape {
  pos: { x: any; y: any }
  radius: number;
  constructor(x: number, y: number, radius: number) {
    this.pos = { x, y }
    this.radius = radius;
  }

  draw() {
    // some draw calls
    console.log(`
      \rcircle drawn 
      \rx:${this.pos.x} y:${this.pos.y}
      \rr:${this.radius} 
    `)
  }

  accept(visitor: any) {
    visitor.visitCircle(this)
  }
}


interface IVisitor {
  visitRect(shape: any): void
  visitCircle(shape: any): void
}


class SVGExportVisitor implements IVisitor {
  data: string
  constructor() {
    this.data = ''
  }
  visitCircle({ pos, radius }) {
    this.data += `\n<circle x="${pos.x}" y="${pos.y}" r="${radius}" />`
  }

  visitRect({ pos, dim }) {
    this.data += `\n<rect x="${pos.x}" y="${pos.y}" w="${dim.w}" h="${dim.h}" />`
  }

  getData() {
    return `<svg>${this.data}\n</svg>`
  }
}

class CanvasCallsExporter implements IVisitor {
  data: string
  constructor() {
    this.data = ''
  }
  visitCircle({ pos, radius }) {
    this.data += `\nctx.arc(${pos.x}, ${pos.y}, 0, ${radius}, Math.PI*2)`
  }

  visitRect({ pos, dim }) {
    this.data += `\nctx.fillRect(${pos.x}, ${pos.y}, ${dim.w}, ${dim.h})`
  }

  getData() {
    return `\rlet canvas = document.createElement('canvas')
    \rlet ctx = canvas.getContext('2d');
    ${this.data}
    `
  }
}

const shapes = [new Rect(1, 1, 2, 2), new Circle(5, 5, 10)]
const svgExportVisitor = new SVGExportVisitor()
const canvasExportVisitor = new CanvasCallsExporter()

// 
consoleColor('magenta', 'EXAMPLE 2: SVG/Canvas Exporter ---')
shapes.forEach(shape => {
  shape.draw()
  shape.accept(svgExportVisitor);
  shape.accept(canvasExportVisitor);
});

consoleColor('green', 'SVGExport:')
consoleColor('blue', svgExportVisitor.getData());

consoleColor('green', '\nCanvasExport:')
consoleColor('blue', canvasExportVisitor.getData())

export { }