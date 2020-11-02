import Node from './node';

export default class LinkedList {
  head: Node;
  tail: Node;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value: any): LinkedList {
    const newNode: Node = new Node(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: any): LinkedList {
    const newNode: Node = new Node(value)

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value: any): any {
    if (!this.head) {
      return null;
    }

    let deletedNode: Node = null;
    while (this.head && this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode: Node = this.head;
    if (currentNode) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail.value === value) {
      this.tail = currentNode;
    }

    return deletedNode ? deletedNode.value : null;
  }

  find(value: any): Node {
    if (!this.head) {
      return null;
    }

    let currentNode: Node = this.head;
    while (currentNode) {
      if (Array.isArray(value)
        && JSON.stringify(currentNode.value) === JSON.stringify(value)) {
          return currentNode;
        }

      if (currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail(): Node {
    if (!this.head) {
      return null;
    }

    const deletedTail: Node = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail.value;
    }

    let currentNode: Node = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail ? deletedTail.value : null;
  }

  deleteHead(): Node {
    if (!this.head) {
      return null;
    }

    const deletedHead: Node = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead ? deletedHead.value : null;
  }

  fromArray(arr: Array<any>): LinkedList {
    arr.forEach((val: any) => this.append(val));

    return this;
  }

  toArray(): Array<any> {
    const nodes: Array<any> = [];

    let currentNode: Node = this.head;
    while (currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  reverse(): LinkedList {
    if (!this.head) {
      return this;
    }

    let currentNode: Node = this.head;
    let prevNode: Node = null;
    let nextNode: Node = null;

    while (currentNode) {
      // preserve ref to next node
      nextNode = currentNode.next;

      // move ref next to previous node instead
      currentNode.next = prevNode;

      // moving 1 step a head
      prevNode = currentNode
      currentNode = nextNode
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
