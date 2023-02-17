const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Free React Course for 2022',
    author: 'Beau Carnes',
    url: 'https://www.freecodecamp.org/news/free-react-course-2022/',
    likes: 25
  },
  {
    title: 'Entry-Level Tech Jobs - Begginer IT Jobs with No Experience Required',
    author: 'Zaira Hira',
    url: 'https://www.freecodecamp.org/news/entry-level-tech-job-guide/',
    likes: 117
  },
  {
    title: 'How to Automatically Cross-post from Your GatsbyJS Blog with RRS',
    author: 'Dane Stevens',
    url: 'https://www.freecodecamp.org/news/how-to-automatically-cross-post-from-your-gatsbyjs-blog-with-rss/',
    likes: 32
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Non existing blog',
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDB
}