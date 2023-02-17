const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')


describe('blog api reading', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send({
      username: 'root',
      password: 'salainen'
    })
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray2 = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray2)
  })
  test('blogs are returned correctly', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  }, 100000)
})

describe('blog api creating new blogs',() => {
  beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send({
      username: 'root',
      password: 'salainen'
    })
    await Blog.deleteMany({})
  })
  test('blogs are added correctly', async () => {

    const usersInDb = await helper.usersInDb()

    expect(usersInDb).toHaveLength(1)

    const login = {
      username: 'root',
      password: 'salainen'
    }

    const loginResponse = await api.post('/api/login')
      .send(login)
      .expect(200)
    const newBlog =
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
      }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(1)
    expect(titles).toContain(
      'Type wars'
    )
  }, 100000)

  test('token is required to add blogs', async () => {
    const newBlog =
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
      }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)


  }, 100000)

  test('likes default to 0', async () => {
    const login = {
      username: 'root',
      password: 'salainen'
    }

    const loginResponse = await api.post('/api/login')
      .send(login)
      .expect(200)
    const newBlog =
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        __v: 0
      }
    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send(newBlog)

    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toBeDefined()
    expect(response.body[0].likes).toBe(0)
  }, 100000)

  test('missing title results in 400', async () => {
    const login = {
      username: 'root',
      password: 'salainen'
    }

    const loginResponse = await api.post('/api/login')
      .send(login)
      .expect(200)
    const newBlog =
      {
        _id: '5a422bc61b54a676234d17fc',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        __v: 0
      }
    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send(newBlog)
      .expect(400)
  }, 100000)

  test('missing url results in 400', async () => {
    const login = {
      username: 'root',
      password: 'salainen'
    }

    const loginResponse = await api.post('/api/login')
      .send(login)
      .expect(200)
    const newBlog =
      {
        _id: '5a422bc61b54a676234d17fc',
        author: 'Robert C. Martin',
        title: 'aaa',
        __v: 0
      }
    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send(newBlog)
      .expect(400)
  }, 100000)
})

describe('blog api deleting a blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send({
      username: 'root',
      password: 'salainen'
    })
    await Blog.deleteMany({})
  })
  test('a blog can be deleted', async () => {
    const login = {
      username: 'root',
      password: 'salainen'
    }

    const loginResponse = await api.post('/api/login')
      .send(login)
      .expect(200)
    const newBlog =
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
      }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      0
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('blog api updating', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send({
      username: 'root',
      password: 'salainen'
    })
    await Blog.deleteMany({})
  })
  test('amount of likes can be increased', async () => {
    const login = {
      username: 'root',
      password: 'salainen'
    }

    const loginResponse = await api.post('/api/login')
      .send(login)
      .expect(200)
    const newBlog =
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
      }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes += 1
    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send(blogToUpdate)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(1)
    const ids = blogsAtEnd.map(r => r.id)

    expect(ids).toContain(blogToUpdate.id)

    for(const blog of blogsAtEnd){
      if (blog.id === blogToUpdate.id){
        expect(blog.likes).toBe(blogToUpdate.likes)
      }
    }
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})