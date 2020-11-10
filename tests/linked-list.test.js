const LinkedList = require('../dist/linked-list').default;
const Node = require('../dist/linked-list/node').default;

function createList() {
  const list = new LinkedList();

  [...arguments].forEach(e => list.append(e));

  return list;
}

describe('Node', () => {
  test('.toString', () => {
    const node = new Node(3);
  
    expect(node.toString()).toEqual('<Node: 3>');
  });

  test('#next', () => {
    const nextNode = new Node('foo');
    const node = new Node(3, nextNode);

    expect(node.next.value).toEqual('foo');
    expect(node.next.next).toEqual(null);
  });
});

describe('LinkedList', () => {
  describe('.append', () => {
    test('OK on empty list', () => {
      const list = createList();
      list.append(3);
  
      expect(list.head.value).toEqual(3);
      expect(list.tail.value).toEqual(3);
    });

    test('OK with multiple value types', () => {
      const list = createList();
      list.append(3);
      list.append('foo');
      list.append([])
      list.append(null);
  
      expect(list.head.value).toEqual(3);
      expect(list.tail.value).toEqual(null);
      expect(list.head.next.value).toEqual('foo')
      expect(list.head.next.next.value).toEqual([]);
    });

    test('should be chainable', () => {
      const list = createList();
      list.append(3).append('foo');

      expect(list.head.value).toEqual(3);
      expect(list.tail.value).toEqual('foo');
    });
  });

  describe('.prepend', () => {
    test('OK on empty list', () => {
      const list = createList();
      list.prepend(3);

      expect(list.head.value).toEqual(3);
      expect(list.tail.value).toEqual(3);
    });

    test('OK with multiple value types', () => {
      const list = createList();
      list.prepend(3);
      list.prepend('foo');
      list.prepend([]);
      list.prepend(null);

      expect(list.head.value).toEqual(null);
      expect(list.head.next.value).toEqual([]);
      expect(list.head.next.next.value).toEqual('foo');
      expect(list.tail.value).toEqual(3);
    });

    test('should be chainable', () => {
      const list = createList();
      list.prepend(3).prepend('foo');

      expect(list.head.value).toEqual('foo');
      expect(list.tail.value).toEqual(3);
    });
  });

  describe('.toArray', () => {
    test('empty list should return empty array', () => {
      const list = createList();

      expect(list.toArray()).toEqual([]);
    });

    test('non-empty list should return array contains all values of nodes', () => {
      const list = createList(3, 'foo', []);

      expect(list.toArray()).toEqual([3, 'foo', []]);
    });
  });

  describe('.fromArray', () => {
    describe('on empty list', () => {
      test('should append items of array as nodes', () => {
        const list = createList();
        list.fromArray([3, null, 'foo']);

        expect(list.head.value).toEqual(3);
        expect(list.head.next.value).toEqual(null);
        expect(list.tail.value).toEqual('foo');
      });

      test('should not make changes if array is empty', () => {
        const list = createList();
        list.fromArray([]);

        expect(list.head).toEqual(null);
        expect(list.tail).toEqual(null);
      });
    });

    describe('on non-empty list', () => {
      test('should append items of array as nodes', () => {
        const list = createList('foo', 3);
        list.fromArray([null, []]);

        expect(list.head.value).toEqual('foo');
        expect(list.head.next.value).toEqual(3);
        expect(list.head.next.next.value).toEqual(null);
        expect(list.tail.value).toEqual([]);
      });

      test('should not make changes if array is empty', () => {
        const list = createList('foo', 3);
        list.fromArray([]);

        expect(list.head.value).toEqual('foo');
        expect(list.tail.value).toEqual(3);
      });
    });
  });

  describe('.delete', () => {
    test('should do nothing if not found', () => {
      const list = createList('foo', 'bar');
      const deletedItem = list.delete('buzz');

      expect(list.toArray()).toEqual(['foo', 'bar']);
      expect(deletedItem).toEqual(null);
    });

    test('should delete middle item OK', () => {
      const list = createList('foo', 'bar', 'buzz');
      const deletedItem = list.delete('bar');

      expect(list.toArray()).toEqual(['foo', 'buzz']);
      expect(deletedItem).toEqual('bar');
    });

    test('should delete head item OK', () => {
      const list = createList('foo', 'bar', 'buzz');
      const deletedItem = list.delete('foo');

      expect(list.toArray()).toEqual(['bar', 'buzz']);
      expect(deletedItem).toEqual('foo');
    });

    test('should delete tail item OK', () => {
      const list = createList('foo', 'bar', 'buzz');
      const deletedItem = list.delete('buzz');

      expect(list.toArray()).toEqual(['foo', 'bar']);
      expect(deletedItem).toEqual('buzz');
    });

    test('should return null if list is empty', () => {
      const list = createList();
      const deletedItem = list.delete('foo');

      expect(deletedItem).toEqual(null);
    });
  });

  describe('.find', () => {
    test('should return nothing from empty list', () => {
      const list = createList();
      const result = list.find('foo');

      expect(result).toEqual(null);
    });

    test('should return value if found', () => {
      const list = createList(3, 'foo', []);
      const strResult = list.find('foo');
      const arrResult = list.find([]);
      const numResult = list.find(3);

      expect(strResult.value).toEqual('foo');
      expect(arrResult.value).toEqual([]);
      expect(numResult.value).toEqual(3);
    });

    test('should return 1st occurence if there are duplications', () => {
      const list = createList('foo', 'foo', 'tail');
      const result = list.find('foo');

      expect(result.value).toEqual('foo');
      expect(result.next.value).toEqual('foo');
    });
  });

  describe('.deleteHead', () => {
    test('should return nothing on empty list', () => {
      const list = createList();
      const deletedItem = list.deleteHead();

      expect(deletedItem).toEqual(null);
    });

    test('should also delete tail if list contains 1 item', () => {
      const list = createList('foo');
      const deletedItem = list.deleteHead();

      expect(deletedItem).toEqual('foo');
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });

    test('should assign later node as head', () => {
      const list = createList('foo', 'bar', 'buzz');
      const deletedItem = list.deleteHead();

      expect(deletedItem).toEqual('foo');
      expect(list.head.value).toEqual('bar');
    });
  });

  describe('.deleteTail', () => {
    test('should return nothing on empty list', () => {
      const list = createList();
      const deletedItem = list.deleteTail();

      expect(deletedItem).toEqual(null);
    });

    test('should also delete head if list contains 1 item', () => {
      const list = createList('foo');
      const deletedItem = list.deleteTail();

      expect(deletedItem).toEqual('foo');
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });

    test('should assign former node as tail', () => {
      const list = createList('foo', 'bar', 'buzz');
      const deletedItem = list.deleteTail();

      expect(deletedItem).toEqual('buzz');
      expect(list.tail.value).toEqual('bar');
    });
  });

  describe('.reverse', () => {
    test('should return empty list if empty list given', () => {
      const list = createList();
      list.reverse();

      expect(list.toArray()).toEqual([]);
    });

    test('should do nothing on single-item list', () => {
      const list = createList(3);
      list.reverse();

      expect(list.toArray()).toEqual([3]);
    });

    test('should reverse non-empty list', () => {
      const list = createList(1, 2, 3);
      list.reverse();

      expect(list.toArray()).toEqual([3, 2, 1]);
    });
  });
});
