const Queue = require('../dist/queue').default;

function createQueue() {
  const queue = new Queue();

  [...arguments].forEach(e => queue.enqueue(e));

  return queue;
}

describe('.isEmpty', () => {
  test('should return false if queue is not empty', () => {
    const queue = createQueue(3);

    expect(queue.isEmpty()).toEqual(false);
  });

  test('should return true if queue is not empty', () => {
    const queue = createQueue();

    expect(queue.isEmpty()).toEqual(true);
  });
});

describe('.peek', () => {
  test('should return the last element come to queue', () => {
    const queue = createQueue(3, 4, 5);

    expect(queue.peek()).toEqual(5);
  });

  test('should return null if queue is empty', () => {
    const queue = createQueue();

    expect(queue.peek()).toEqual(null);
  });

  test('should make no changes to the queue', () => {
    const queue = createQueue(3);

    expect(queue.peek()).toEqual(3);
    expect(queue.peek()).toEqual(3);
    expect(queue.isEmpty()).toEqual(false);
  });
});

describe('.enqueue', () => {
  test('should add item to the queue', () => {
    const queue = createQueue();
    queue.enqueue('foo');

    expect(queue.peek()).toEqual('foo');
  });
})

describe('.dequeue', () => {
  test('should remove the last element of the queue', () => {
    const queue = createQueue(3, 4);

    queue.dequeue();
    expect(queue.peek()).toEqual(4);

    queue.dequeue();
    expect(queue.peek()).toEqual(null);
  });

  test('should return the deleted item', () => {
    const queue = createQueue(3, 'foo');

    expect(queue.dequeue()).toEqual(3);
  });
});

describe('.toArray', () => {
  test('should return empty array if the queue is empty', () => {
    const queue = createQueue();

    expect(queue.toArray()).toEqual([]);
  });

  test('should return all values as array', () => {
    const queue = createQueue('foo', 3, 'bar');

    expect(queue.toArray()).toEqual(['bar', 3, 'foo']);
  });
});
