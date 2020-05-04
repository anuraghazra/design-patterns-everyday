// Example 1
class Button {
  render() {}
}

class Factory {
  createButton() {}
}

class WinButton extends Button {
  render() {
    return "<button class='windows'></button>";
  }
}

class LinuxButton extends Button {
  render() {
    return "<button class='linux'></button>";
  }
}

class WinFactory extends Factory {
  createButton() {
    return new WinButton();
  }
}
class LinuxFactory extends Factory {
  createButton() {
    return new LinuxButton();
  }
}

class AbstractFactory {
  static factory(type) {
    switch (type) {
      case "windows":
        return new WinFactory();
      case "linux":
        return new LinuxFactory();

      default:
        break;
    }
  }
}

let guiFactory = AbstractFactory.factory("linux");
let button = guiFactory.createButton();
console.log(button.render());

// Example 2 ----

/**
  ----
  AbstractFactory
  ShapeFactory extends AbstractFactory
  FactoryProducer (generates factories)
  ----
  Shape
  Rectangle
  Triangle
  ----
  RoundedShapeFactory
  RoundedRectangle
  RoundedTriangle
*/

class Shape {
  draw() {
    null;
  }
}

class Rectangle extends Shape {
  draw() {
    return console.log("Rectangle");
  }
}
class Triangle extends Shape {
  draw() {
    return console.log("Triangle");
  }
}
class RoundedRectangle extends Shape {
  draw() {
    return console.log("Rounded-Rectangle");
  }
}
class RoundedTriangle extends Shape {
  draw() {
    return console.log("Rounded-Triangle");
  }
}

class AbstractFactory {
  getShape(type) {
    return null;
  }
}

class ShapeFactory extends AbstractFactory {
  getShape(type) {
    switch (type) {
      case "rectangle":
        return new Rectangle();
      case "triangle":
        return new Triangle();

      default:
        break;
    }
  }
}
class RoundedShapeFactory extends AbstractFactory {
  getShape(type) {
    switch (type) {
      case "rectangle":
        return new RoundedRectangle();
      case "triangle":
        return new RoundedTriangle();

      default:
        break;
    }
  }
}

class FactoryProducer {
  static getFactory(type) {
    switch (type) {
      case "rounded":
        return new RoundedShapeFactory();
      default:
        return new ShapeFactory();
    }
  }
}

let shapeFactory1 = FactoryProducer.getFactory("rounded");
let rect = shapeFactory1.getShape("rectangle");
let trig = shapeFactory1.getShape("triangle");
rect.draw();
trig.draw();

let shapeFactory2 = FactoryProducer.getFactory();
let roundedRect = shapeFactory2.getShape("rectangle");
let roundedTrig = shapeFactory2.getShape("triangle");
roundedRect.draw();
roundedTrig.draw();
