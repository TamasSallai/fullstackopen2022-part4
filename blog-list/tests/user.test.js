const app = require('../server')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

describe('User creation', () => {
  beforeEach(async () => {
    await User.deleteMany()
  })

  test('fails, when username or password missing', async () => {
    const userWithoutPassword = {
      name: 'John Doe',
      username: 'johndoe',
    }

    const userWithoutUsername = {
      name: 'John Doe',
      password: 'secret',
    }

    await api.post('/api/users').send(userWithoutPassword).expect(400)
    let users = await User.find({})
    expect(users).toHaveLength(0)

    await api.post('/api/users').send(userWithoutUsername).expect(400)
    users = await User.find({})
    expect(users).toHaveLength(0)
  })

  test('fails, when username or password is less then 3 character long', async () => {
    const userWithoutPassword = {
      name: 'John Doe',
      username: '12',
    }

    const userWithoutUsername = {
      name: 'John Doe',
      password: '12',
    }

    await api.post('/api/users').send(userWithoutPassword).expect(400)
    let users = await User.find({})
    expect(users).toHaveLength(0)

    await api.post('/api/users').send(userWithoutUsername).expect(400)
    users = await User.find({})
    expect(users).toHaveLength(0)
  })
})

describe('User login', () => {
  beforeEach(async () => {
    await User.deleteMany()
    const user = new User({
      name: 'Test',
      username: 'Test',
      passwordHash: await bcrypt.hash('test_password', 10),
    })
    await user.save()
  })

  test('succed with valid credentials', async () => {
    const user = {
      username: 'Test',
      password: 'test_password',
    }

    const response = await api.post('/api/login').send(user).expect(200)

    const sampleResponse = {
      token: 'test',
      username: 'test',
      name: 'test',
    }
    expect(Object.keys(response.body)).toEqual(Object.keys(sampleResponse))
  })

  test('fails with invalid credentials', async () => {
    const user = {
      username: 'invalid_test',
      password: 'invalid_test_password',
    }

    const response = await api.post('/api/login').send(user).expect(401)
    console.log(response.body)
    expect(response.body).toMatchObject({
      error: 'invalid username or password',
    })
  })
})
