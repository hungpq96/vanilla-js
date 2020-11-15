const Stack = require('../dist/stack').default;

function createStack() {
  const stack = new Stack();

  [...arguments].forEach(e => stack.push(e));

  return stack;
}

describe('.isEmpty', () => {
  test('should return true if list empty', () => {
    const stack = createStack();

    expect(stack.isEmpty()).toEqual(true);
  });

  test('should return false if list not empty', () => {
    const stack = createStack(1, 2);

    expect(stack.isEmpty()).toEqual(false);
  });
});

describe('.peek', () => {
  test('should return null if list empty', () => {
    const stack = createStack();

    expect(stack.peek()).toEqual(null);
  });

  test('should return the last element', () => {
    const stack = createStack('foo', 'bar', 'buzz');

    expect(stack.peek()).toEqual('buzz');
  });

  test('should no make any changes to stack', () => {
    const stack = createStack(4);

    expect(stack.peek()).toEqual(4);
    expect(stack.peek()).toEqual(4);
    expect(stack.isEmpty()).toEqual(false);
  });
});

describe('.push', () => {
  test('should append stack', () => {
    const stack = createStack();
    stack.push(3);

    expect(stack.peek()).toEqual(3);
  });
});

describe('.pop', () => {
  test('should return the last element', () => {
    const stack = createStack(3, 4, 5);

    expect(stack.pop()).toEqual(5);
  });

  test('should remove the last element', () => {
    const stack = createStack(3, 4, 5);
    stack.pop();

    expect(stack.peek()).toEqual(4);
  });
});

describe('.toArray', () => {
  test('should return empty array if list empty', () => {
    const stack = createStack();

    expect(stack.toArray()).toEqual([]);
  });

  test('should return all list as an array', () => {
    const stack = createStack(3, 'foo', []);

    expect(stack.toArray()).toEqual([[], 'foo', 3]);
  });
});
