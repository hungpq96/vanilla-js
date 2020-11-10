const HashTable = require('../dist/hash-table').default;

function createHashTable() {
  const hashTable = new HashTable();

  [...arguments].forEach(e => {
    const key = Object.getOwnPropertyNames(e)[0];
    const value = e[key];

    hashTable.set(key, value);
  });

  return hashTable;
}

describe('HashTable', () => {
  describe('.hash', () => {
    test('should return 0 if given empty string', () => {
      const hashTable = createHashTable();

      expect(hashTable.hash('')).toEqual(0);
    });

    test('should sum char code of all characters and mod with hash size', () => {
      const hashTable = createHashTable();
      const testString = 'abc'; // a = 97 => (a + b + c) % hashSize = (97 + 98 + 99) % 32 = 6

      expect(hashTable.hash(testString)).toEqual(6);
    });
  });

  describe('.set', () => {
    test('should add new item if the key is not yet exist', () => {
      const hashTable = createHashTable({
        foo: 'this is foo value'
      });

      expect(hashTable.get('foo')).toEqual('this is foo value');
    });

    test('should override item if the key is already existed', () => {
      const hashTable = createHashTable({
        foo: 'before'
      }, {
        foo: 'after'
      });

      expect(hashTable.get('foo')).toEqual('after');
    });

    test('should return all values with the same hash code', () => {
      const hashTable = createHashTable({
        foo: 'origin'
      }, {
        oof: 'duplication'
      });
      const hashKey = hashTable.hash('foo');

      expect(hashTable.buckets[hashKey].head.value.value).toEqual('origin');
      expect(hashTable.buckets[hashKey].tail.value.value).toEqual('duplication');
    });
  });

  describe('.get', () => {
    test('should return undefined on empty hashTable', () => {
      const hashTable = createHashTable();

      expect(hashTable.get('foo')).toEqual(undefined);
    });

    test('should return undefined on non exist key', () => {
      const hashTable = createHashTable({ foo: 'fooooo' });

      expect(hashTable.get('bar')).toEqual(undefined);
    });

    test('should return item if found', () => {
      const hashTable = createHashTable({ foo: 'fooooo' });

      expect(hashTable.get('foo')).toEqual('fooooo');
    });

    test('should return the right item if 2 items have the same hash code', () => {
      const hashTable = createHashTable({
        foo: 'foo'
      }, {
        oof: 'oof'
      });

      expect(hashTable.get('oof')).toEqual('oof');
      expect(hashTable.get('foo')).toEqual('foo');
    });
  });

  describe('.delete', () => {
    test('should return null if delete a non-exist key', () => {
      const hashTable = createHashTable();
      const deletedItem = hashTable.delete('foo');

      expect(deletedItem).toEqual(null);
    })

    test('should return deleted item', () => {
      const hashTable = createHashTable({ foo: 123 });
      const deletedItem = hashTable.delete('foo');

      expect(deletedItem.value).toEqual(123);
      expect(hashTable.get('foo')).toEqual(undefined);
    });
  });

  describe('.has', () => {
    test('should return true if key exist', () => {
      const hashTable = createHashTable({ foo: '123'});

      expect(hashTable.has('foo')).toEqual(true);
    });

    test('should return false if key not exists', () => {
      const hashTable = createHashTable({ bar: '123' });

      expect(hashTable.has('foo')).toEqual(false);
    });
  });

  describe('.getKeys', () => {
    test('should return a list of keys if hashTable have items', () => {
      const hashTable = createHashTable({
        b: 'foo'
      }, {
        a: 'bar',
      }, {
        3: 'three',
      });
  
      expect(hashTable.getKeys()).toEqual(['3', 'b', 'a']);
    });

    test('should return emtpy array if hashTable is empty', () => {
      const hashTable = createHashTable();

      expect(hashTable.getKeys()).toEqual([]);
    });
  });
});
