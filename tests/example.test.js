const { greeting } = require('../dist/example');

test('should greeting', () => {
  expect(greeting('foo')).toEqual('Welcome to foo');
});
