import LinkedList from '../linked-list';

export default class Queue {
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

  enqueue(value: any): void {
    this.list.prepend(value);
  }

  dequeue(): any {
    return this.list.deleteTail();
  }

  toArray(): Array<any> {
    return this.list.toArray();
  }
}