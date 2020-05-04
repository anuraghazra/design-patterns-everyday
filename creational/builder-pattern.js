class ComputerBuilder {
  constructor() {
    this.name = "";
    this.RAM = "";
    this.HDD = "";
    this.CPU = "";
    this.monitor = "";
  }

  setName(name) {
    this.name = name;
    return this;
  }
  addRAM(value) {
    this.RAM = value;
    return this;
  }
  addHDD(value) {
    this.HDD = value;
    return this;
  }
  addCPU(value) {
    this.CPU = value;
    return this;
  }
  addMonitor(value) {
    this.monitor = value;
    return this;
  }

  build() {
    return new Computer(this.name, this.RAM, this.HDD, this.CPU, this.monitor);
  }
}

class Computer {
  constructor(name, RAM, HDD, CPU, monitor) {
    this.name = name;
    this.RAM = RAM;
    this.HDD = HDD;
    this.CPU = CPU;
    this.monitor = monitor;
  }

  printSpecs() {
    console.log(`
      --- ${this.name} ---
      - RAM: ${this.RAM}
      - HDD: ${this.HDD}
      - CPU: ${this.CPU}
      - Monitor: ${this.monitor}
    `);
  }
}

let MyPC = new ComputerBuilder()
  .setName("Ok PC")
  .addCPU("AMD A8 7600")
  .addRAM("8GB")
  .addHDD("1TB")
  .addMonitor("DELL")
  .build();

let HighendPC = new ComputerBuilder()
  .setName("DAMN GOOD PC")
  .addCPU("Intel i9")
  .addRAM("32GB")
  .addHDD("5TB")
  .addMonitor("Asus")
  .build();

MyPC.printSpecs();
HighendPC.printSpecs();
