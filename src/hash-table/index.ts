import LinkedList from '../linked-list';

const DEFAULT_HASH_TABLE_SIZE = 32

export default class HashTable {
  buckets: Array<LinkedList>;
  keys: any;

  constructor(hashTableSize: number = DEFAULT_HASH_TABLE_SIZE) {
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList());

    this.keys = {};
  }

  hash(key: string): number {
    const hash: number = Array
      .from(key)
      .reduce((prev: number, curr: string) => prev + curr.charCodeAt(0), 0);

    return hash % this.buckets.length;
  }

  set(key: string, value: any): void {
    const keyHash: number = this.hash(key);
    this.keys[key] = keyHash;

    const bucket: LinkedList = this.buckets[keyHash];
    const node: any = bucket.find(null, (nodeValue: any) => nodeValue.key === key);

    if (!node) {
      bucket.append({ key, value });
    } else {
      node.value.value = value;
    }
  }

  get(key: string): object {
    const keyHash: number = this.hash(key);
    const bucket: LinkedList = this.buckets[keyHash];
    const node: any = bucket.find(null, (nodeValue: any) => nodeValue.key === key);

    return node ? node.value.value : undefined;
  }

  delete(key: string): object {
    const keyHash: number = this.hash(key);
    delete this.keys[keyHash];

    const bucket: LinkedList = this.buckets[keyHash];
    const node: any = bucket.find(null, (nodeValue: any) => nodeValue.key === key);

    if (node) {
      return bucket.delete(node.value);
    }

    return null;
  }

  has(key: string): boolean {
    return this.keys.hasOwnProperty(key);
  }

  getKeys(): Array<string> {
    return Object.keys(this.keys);
  }
}
