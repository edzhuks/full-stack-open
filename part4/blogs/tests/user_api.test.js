const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})
describe('user api read users', () => {
  test('users are returned correctly', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialUsers.length)
  }, 100000)
})

describe('user api create users', () => {
  test('valid user is added correctly', async () => {

    const newUser = {
      username: 'newUser',
      name: 'New Test User',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')

    const usernames = response.body.map(r => r.username)

    expect(usernames).toContainEqual(newUser.username)
  }, 100000)

  test('nonunique username is not allowed', async () => {

    const newUser = {
      username: 'root',
      name: 'New Test User',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)

  }, 100000)

  test('short username is not allowed', async () => {

    const newUser = {
      username: 'r',
      name: 'New Test User',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)

  }, 100000)

  test('short password is not allowed', async () => {

    const newUser = {
      username: 'newUserr',
      name: 'New Test User',
      password: 'pa'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)

  }, 100000)
})

afterAll(async () => {
  await mongoose.connection.close()
})