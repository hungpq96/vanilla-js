import LinkedList from '../linked-list';

export default class Stack {
  list: LinkedList;

  constructor() {
    this.list = new LinkedList();
  }

  isEmpty(): boolean {
    return !this.list.head;
  }

  peek(): any {
    if (this.isEmpty()) {
      return null;
    }

    return this.list.head.value;
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
