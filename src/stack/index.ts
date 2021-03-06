import LinkedList from '../linked-list';

export default class Stack {
  list: LinkedList;

  constructor() {
    this.list = new LinkedList();
  }

  isEmpty(): Boolean {
    return !this.list.head;
  }

  peek(): any {
    return this.isEmpty() ? null : this.list.head.value;
  }

  push(value: any): void {
    this.list.prepend(value);
  }

  pop(): any {
    return this.list.deleteHead();
  }

  toArray(): Array<any> {
    return this.list.toArray();
  }
}
