const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('Favorite blog', () => {

  const blogs = [
    {
      title: 'How to watch Rocky Balboa movies',
      author: 'Augusto Seta',
      likes: 25,
      id: 2312312312
    },
    {
      title: 'How to boxing to Apollo Creed',
      author: 'Rocky Balboa',
      likes: 7,
      id: 2342342342
    },
    {
      title: 'How to boxing to Apollo Creed - URRS Version',
      author: 'Ivan Drago',
      likes: 20,
      id: 23125676756
    }
  ]

  test('the most voted blog is Augusto Seta\'s blog', () => {
    const result = favoriteBlog(blogs);

    expect(result).toEqual({
      author: 'Augusto Seta',
      likes: 25
    })
  })
})