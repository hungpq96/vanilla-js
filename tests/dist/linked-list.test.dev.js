"use strict";

var LinkedList = require('../dist/linked-list')["default"];

var Node = require('../dist/linked-list/node')["default"];

function createList() {
  var list = new LinkedList();
  Array.prototype.slice.call(arguments).forEach(function (e) {
    return list.append(e);
  });
  return list;
}

describe('Node', function () {
  test('.toString', function () {
    var node = new Node(3);
    expect(node.toString()).toEqual('<Node: 3>');
  });
  test('#next', function () {
    var nextNode = new Node('foo');
    var node = new Node(3, nextNode);
    expect(node.next.value).toEqual('foo');
    expect(node.next.next).toEqual(null);
  });
});
describe('LinkedList', function () {
  describe('.append', function () {
    test('OK on empty list', function () {
      var list = createList();
      list.append(3);
      expect(list.head.value).toEqual(3);
      expect(list.tail.value).toEqual(3);
    });
    test('OK with multiple value types', function () {
      var list = createList();
      list.append(3);
      list.append('foo');
      list.append([]);
      list.append(null);
      expect(list.head.value).toEqual(3);
      expect(list.tail.value).toEqual(null);
      expect(list.head.next.value).toEqual('foo');
      expect(list.head.next.next.value).toEqual([]);
    });
    test('should be chainable', function () {
      var list = createList();
      list.append(3).append('foo');
      expect(list.head.value).toEqual(3);
      expect(list.tail.value).toEqual('foo');
    });
  });
  describe('.prepend', function () {
    test('OK on empty list', function () {
      var list = createList();
      list.prepend(3);
      expect(list.head.value).toEqual(3);
      expect(list.tail.value).toEqual(3);
    });
    test('OK with multiple value types', function () {
      var list = createList();
      list.prepend(3);
      list.prepend('foo');
      list.prepend([]);
      list.prepend(null);
      expect(list.head.value).toEqual(null);
      expect(list.head.next.value).toEqual([]);
      expect(list.head.next.next.value).toEqual('foo');
      expect(list.tail.value).toEqual(3);
    });
    test('should be chainable', function () {
      var list = createList();
      list.prepend(3).prepend('foo');
      expect(list.head.value).toEqual('foo');
      expect(list.tail.value).toEqual(3);
    });
  });
  describe('.toArray', function () {
    test('empty list should return empty array', function () {
      var list = createList();
      expect(list.toArray()).toEqual([]);
    });
    test('non-empty list should return array contains all values of nodes', function () {
      var list = createList(3, 'foo', []);
      expect(list.toArray()).toEqual([3, 'foo', []]);
    });
  });
  describe('.fromArray', function () {
    describe('on empty list', function () {
      test('should append items of array as nodes', function () {
        var list = createList();
        list.fromArray([3, null, 'foo']);
        expect(list.head.value).toEqual(3);
        expect(list.head.next.value).toEqual(null);
        expect(list.tail.value).toEqual('foo');
      });
      test('should not make changes if array is empty', function () {
        var list = createList();
        list.fromArray([]);
        expect(list.head).toEqual(null);
        expect(list.tail).toEqual(null);
      });
    });
    describe('on non-empty list', function () {
      test('should append items of array as nodes', function () {
        var list = createList('foo', 3);
        list.fromArray([null, []]);
        expect(list.head.value).toEqual('foo');
        expect(list.head.next.value).toEqual(3);
        expect(list.head.next.next.value).toEqual(null);
        expect(list.tail.value).toEqual([]);
      });
      test('should not make changes if array is empty', function () {
        var list = createList('foo', 3);
        list.fromArray([]);
        expect(list.head.value).toEqual('foo');
        expect(list.tail.value).toEqual(3);
      });
    });
  });
  describe('.delete', function () {
    test('should do nothing if not found', function () {
      var list = createList('foo', 'bar');
      var deletedItem = list["delete"]('buzz');
      expect(list.toArray()).toEqual(['foo', 'bar']);
      expect(deletedItem).toEqual(null);
    });
    test('should delete middle item OK', function () {
      var list = createList('foo', 'bar', 'buzz');
      var deletedItem = list["delete"]('bar');
      expect(list.toArray()).toEqual(['foo', 'buzz']);
      expect(deletedItem).toEqual('bar');
    });
    test('should delete head item OK', function () {
      var list = createList('foo', 'bar', 'buzz');
      var deletedItem = list["delete"]('foo');
      expect(list.toArray()).toEqual(['bar', 'buzz']);
      expect(deletedItem).toEqual('foo');
    });
    test('should delete tail item OK', function () {
      var list = createList('foo', 'bar', 'buzz');
      var deletedItem = list["delete"]('buzz');
      expect(list.toArray()).toEqual(['foo', 'bar']);
      expect(deletedItem).toEqual('buzz');
    });
    test('should return null if list is empty', function () {
      var list = createList();
      var deletedItem = list["delete"]('foo');
      expect(deletedItem).toEqual(null);
    });
  });
  describe('.find', function () {
    test('should return nothing from empty list', function () {
      var list = createList();
      var result = list.find('foo');
      expect(result).toEqual(null);
    });
    test('should return value if found', function () {
      var list = createList(3, 'foo', []);
      var strResult = list.find('foo');
      var arrResult = list.find([]);
      var numResult = list.find(3);
      expect(strResult.value).toEqual('foo');
      expect(arrResult.value).toEqual([]);
      expect(numResult.value).toEqual(3);
    });
    test('should return 1st occurence if there are duplications', function () {
      var list = createList('foo', 'foo', 'tail');
      var result = list.find('foo');
      expect(result.value).toEqual('foo');
      expect(result.next.value).toEqual('foo');
    });
  });
  describe('.deleteHead', function () {
    test('should return nothing on empty list', function () {
      var list = createList();
      var deletedItem = list.deleteHead();
      expect(deletedItem).toEqual(null);
    });
    test('should also delete tail if list contains 1 item', function () {
      var list = createList('foo');
      var deletedItem = list.deleteHead();
      expect(deletedItem).toEqual('foo');
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });
    test('should assign later node as head', function () {
      var list = createList('foo', 'bar', 'buzz');
      var deletedItem = list.deleteHead();
      expect(deletedItem).toEqual('foo');
      expect(list.head.value).toEqual('bar');
    });
  });
  describe('.deleteTail', function () {
    test('should return nothing on empty list', function () {
      var list = createList();
      var deletedItem = list.deleteTail();
      expect(deletedItem).toEqual(null);
    });
    test('should also delete head if list contains 1 item', function () {
      var list = createList('foo');
      var deletedItem = list.deleteTail();
      expect(deletedItem).toEqual('foo');
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });
    test('should assign former node as tail', function () {
      var list = createList('foo', 'bar', 'buzz');
      var deletedItem = list.deleteTail();
      expect(deletedItem).toEqual('buzz');
      expect(list.tail.value).toEqual('bar');
    });
  });
  describe('.reverse', function () {
    test('should return empty list if empty list given', function () {
      var list = createList();
      list.reverse();
      expect(list.toArray()).toEqual([]);
    });
    test('should do nothing on single-item list', function () {
      var list = createList(3);
      list.reverse();
      expect(list.toArray()).toEqual([3]);
    });
    test('should reverse non-empty list', function () {
      var list = createList(1, 2, 3);
      list.reverse();
      expect(list.toArray()).toEqual([3, 2, 1]);
    });
  });
});