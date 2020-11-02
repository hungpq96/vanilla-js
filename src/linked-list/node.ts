export default class Node {
  value: Node;
  next: Node;

  constructor(value: any, next: Node = null) {
    this.value = value;
    this.next = next;
  };

  toString(): string {
    return `<Node: ${this.value.toString()}>`;
  }
}
