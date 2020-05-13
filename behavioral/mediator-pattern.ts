// mediator pattern
import { consoleColor } from '../utils';

interface IMediator {
  sendMessage(msg: string, from: any, to?: any): void
}

class Chatroom implements IMediator {
  members: { [x: string]: Member };
  constructor() {
    this.members = {}
  }

  addMember(member: Member) {
    member.chatroom = this;
    this.members[member.name] = member;
  }

  sendMessage(msg: string, from: Member, to?: Member) {
    Object.keys(this.members).forEach(name => {
      if (!to && name !== from.name) {
        this.members[name].receive(msg, from)
        return;
      }
      if (to && name == to.name) {
        this.members[name].receive(msg, from)
      }
    })
  }
}


class Member {
  name: string;
  chatroom: Chatroom;
  constructor(name: string) {
    this.name = name;
    this.chatroom = null;
  }

  send(msg: string, to?: any) {
    this.chatroom.sendMessage(msg, this, to)
  }

  receive(msg: string, from: Member) {
    consoleColor('magenta', `-------`)
    consoleColor('cyan', `${from.name} says to ${this.name} : `)
    consoleColor('green', `${msg}`)
    consoleColor('magenta', `-------`)
  }
}

const chatroom = new Chatroom();

let anurag = new Member('Anurag')
let hitman = new Member('hitman');
let jonathan = new Member('John Wick');
chatroom.addMember(anurag);
chatroom.addMember(hitman);
chatroom.addMember(jonathan);

anurag.send('I\'m more dangerous than you hitman');
hitman.send('Sorry brother forgive me! pls', anurag);
jonathan.send('Hey hey hey hitman, nerver ever mess with Anurag', hitman);