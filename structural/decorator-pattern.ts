// decorator design pattern

// simplified example
function loggerDecorator(wrapped) {
  return function (...args) {
    console.log('******')
    console.log(wrapped.apply(this, args))
    console.log('******')
  }
}
function mapper(arr: any[], add: number) {
  return arr.map(i => i + add);
}

loggerDecorator(mapper)([1, 2, 3], 10)


// Classes
interface IWeapon {
  shoot(): string;
  setAttachment(attachment: string): void
}

class Weapon implements IWeapon {
  name: string;
  power: number;
  range: number;
  stability: number;
  attachments: string[];
  constructor(
    name: string,
    power: number,
    range: number,
    stability: number,
  ) {
    this.name = name;
    this.power = power;
    this.range = range;
    this.stability = stability;
    this.attachments = [];
  }

  getPower(): number {
    return this.power
  }
  setPower(power: number) {
    this.power = power
  }
  getRange(): number {
    return this.range
  }
  setRange(range: number) {
    this.range = range
  }
  setAttachment(attachment: string) {
    this.attachments.push(attachment)
  }

  shoot() {
    let margins = `_`.repeat(20)
    let header = margins;
    header = header.slice(this.name.length / 2, header.length);
    let headerEnd = header;
    header += this.name + headerEnd;

    return `
      ${header}
      
      Phew! phew! phew!
      Fired ${this.name} with power of ${this.power}/100
      -----
      Range: ${this.range}/100
      Stability: ${this.stability}/100

      Attachments: ${this.attachments.map(a => `\n\t- ${a}`).join('') || 'None'}
      _${margins + margins}
    `;
  }
}

abstract class WeaponDecorator implements IWeapon {
  private component: Weapon;
  constructor(c: Weapon) {
    this.component = c;
  }

  getPower(): number {
    return this.component.getPower()
  }
  setPower(p: number) {
    return this.component.setPower(p)
  }
  getRange(): number {
    return this.component.getRange()
  }
  setRange(r: number) {
    return this.component.setRange(r)
  }
  setAttachment(attachment: string) {
    this.component.setAttachment(attachment)
  }
  shoot() {
    return this.component.shoot()
  }
}

class withSilencer extends WeaponDecorator {
  constructor(weapon: any) {
    super(weapon);
    super.setRange(super.getRange() - 20)
    super.setPower(super.getPower() - 15)
    super.setAttachment('silencer')
  }
}

class withScope extends WeaponDecorator {
  constructor(weapon: any, scopeType: string) {
    super(weapon);
    super.setRange(super.getRange() + 40)
    super.setAttachment('scope: ' + scopeType)
  }
}

const AK47 = new Weapon("Ak47", 45, 70, 40)

const AK47Enhanced =
  new withScope(
    new withSilencer(
      new Weapon("Ak47 Enhanced", 45, 70, 40),
    ),
    '8x'
  )

console.log(AK47.shoot());
console.log(AK47Enhanced.shoot());
