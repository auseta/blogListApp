const dummy = require('../utils/blog_helper').dummy

describe('list helper', () => {
  test('dummy returns one', () => {
    expect(dummy([])).toBe(1)
  })
})