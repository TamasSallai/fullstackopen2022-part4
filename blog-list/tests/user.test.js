const app = require('../server')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')

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
})
