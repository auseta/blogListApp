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

test('all blogs are returned as json', async () => {
  const blogs = await api.get('/api/blogs')
  console.log('BLOGS', blogs);

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('the unique identifier property of blog posts is called id', async () => {
  const blogs = await api.get('/api/blogs')
  for (const blog of blogs.body) {
    expect(blog.id).toBeDefined()
  }
})

afterAll(async () => {
  await mongoose.connection.close()
})