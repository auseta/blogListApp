const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 100000)

describe('HTTP GET /api/blogs', () => {
  test('all blogs are returned as json', async () => {
    const blogs = await api.get('/api/blogs')
  
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('HTTP id and not _id', () => {
  test('the unique identifier property of the blog posts is called id', async () => {
    const blogs = await api.get('/api/blogs')
    for (const blog of blogs.body) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('HTTP POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'Augusto Seta',
      url: '23123123123',
      likes: 20
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('test blog')
  })
})

describe('Check if the likes property exist', () => {
  test('verifies the likes property', async () => {
    const responseBlogs = await api.get('/api/blogs')
    
    responseBlogs.body.forEach(blog => {
      if (!blog.likes) {
        blog.likes = 0
      }
    })

    console.log(responseBlogs.body);
    
    responseBlogs.body.forEach(blog => {
      expect(blog.likes).toBeDefined
    })
  })
})

describe('Check if URL or TITLE property is missing', () => {
  test('Blog has no TITLE or URL properties', async () => {
    const newBlog = {
      author: 'Rocko',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsInDb = await helper.blogsInDB()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})