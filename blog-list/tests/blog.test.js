const app = require('../server')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Learn NodeJS',
    author: 'Sallai Tamás',
    url: 'http://127.0.0.1:3001/api/blogs',
    likes: 1,
  },
  {
    title: 'Learn Jest',
    author: 'Sallai Tamás',
    url: 'http://127.0.0.1:3001/api/blogs',
    likes: 2,
  },
  {
    title: 'Learn GraphQL',
    author: 'Szabados Evelin',
    url: 'http://127.0.0.1:3001/api/blogs',
    likes: 7,
  },
]

beforeEach(async () => {
  await Blog.deleteMany()

  const blogObjects = initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('when database contains data', () => {
  test('all blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('JSON of a blog post not contains MongoDB specific data', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    expect(blog.id).toBeDefined()
    expect(blog._id).not.toBeDefined()
    expect(blog.__v).not.toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const blog = {
      title: 'New blog post from test',
      author: 'Sallai Tamás',
      url: 'http://127.0.0.1:3001/api/blogs',
      likes: 9999,
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const rawBlogs = await Blog.find({})
    const blogs = rawBlogs.map((blog) => blog.toJSON())
    expect(blogs).toHaveLength(initialBlogs.length + 1)
    expect(blogs[blogs.length - 1]).toMatchObject({
      title: 'New blog post from test',
      author: 'Sallai Tamás',
      url: 'http://127.0.0.1:3001/api/blogs',
      likes: 9999,
    })
  })

  test('succeeds and when likes not included in the request, it defaults to 0', async () => {
    const blog = {
      title: 'New blog post without likes',
      author: 'Sallai Tamás',
      url: 'http://127.0.0.1:3001/api/blogs',
    }

    const response = await api.post('/api/blogs').send(blog)

    const createdBlog = await Blog.findById(response.body.id)
    expect(createdBlog).toMatchObject({
      title: 'New blog post without likes',
      author: 'Sallai Tamás',
      url: 'http://127.0.0.1:3001/api/blogs',
      likes: 0,
    })
  })

  test('fails with the response 400 Bad Request, when title or url not included', async () => {
    const blogWithoutURL = {
      title: 'url not included',
      author: 'Sallai Tamás',
    }

    const blogWithoutTitle = {
      author: 'Sallai Tamás',
      url: 'http://127.0.0.1:3001/api/blogs',
    }

    await api.post('/api/blogs').send(blogWithoutURL).expect(400)
    await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with a valid id', async () => {
    const existingId = (await Blog.find({}))[0].id
    await api.delete(`/api/blogs/${existingId}`).expect(204)
  })

  test('fails with non existing id', async () => {
    const blog = new Blog({
      title: 'Should remove',
      author: 'Sallai Tamás',
      url: 'http://127.0.0.1:3001/api/blogs',
    })
    await blog.save()
    await blog.remove()

    await api.delete(`/api/blogs/${blog.id}`).expect(404)
  })

  test('responds with 400 Bad Request with malformated id', async () => {
    await api.delete(`/api/blogs/1`).expect(400)
  })
})

describe('updating a blog', () => {
  test('succeed with valid id', async () => {
    const blogToModify = (await Blog.find({}))[0].toJSON()
    const newBlog = {
      likes: 4567,
    }

    await api.put(`/api/blogs/${blogToModify.id}`).send(newBlog).expect(200)

    const modifiedBlog = (await Blog.find({}))[0].toJSON()
    expect(modifiedBlog).toMatchObject(newBlog)
  })

  test('fails with non existing id', async () => {
    const blog = new Blog({
      title: 'Should remove',
      author: 'Sallai Tamás',
      url: 'http://127.0.0.1:3001/api/blogs',
    })
    await blog.save()
    await blog.remove()

    const newBlog = {
      title: 'modified title',
      author: 'modified author',
      url: 'modified url',
    }

    await api.put(`/api/blogs/${blog.id}`).send(newBlog).expect(404)
  })

  test('responds with 400 Bad Request with malformated id', async () => {
    await api.put(`/api/blogs/1`).expect(400)
  })
})
