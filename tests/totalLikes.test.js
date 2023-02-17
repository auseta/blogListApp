const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {
  
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id:'34234234234',
        title: 'Dummy blog',
        author: 'Augusto Seta',
        url: 'www.dummy.com',
        likes: 7,
        __v: 0
      }
    ]
    const result = totalLikes(listWithOneBlog)


    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const listWithManyBlogs = [
      {
        _id:'34234234234',
        title: 'Dummy blog',
        author: 'Augusto Seta',
        url: 'www.dummy.com',
        likes: 7,
        __v: 0
      },
      {
        _id:'3fsdfdfs423',
        title: 'Dummy blog 2',
        author: 'Augusto Seta',
        url: 'www.dummy2.com',
        likes: 3,
        __v: 0
      },
      {
        _id:'3423423123234234',
        title: 'Dummy blog 3',
        author: 'Augusto Seta',
        url: 'www.dummy3.com',
        likes: 2,
        __v: 0
      }
    ]
    const result = totalLikes(listWithManyBlogs)

    expect(result).toBe(12)
  })

})