const {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
} = require('./list_helpers')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

test('dummy returns one', () => {
  expect(dummy([])).toBe(1)
})

describe('total likes', () => {
  test('when list has one blog, equals the likes of that', () => {
    expect(totalLikes(listWithOneBlog)).toBe(5)
  })

  test('when list has many blogs, equals the likes of all blogs', () => {
    expect(totalLikes(blogs)).toBe(36)
  })

  test('when list has no blogs, equals 0', () => {
    expect(totalLikes([])).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when list has one blog, equals of that', () => {
    expect(favoriteBlogs(listWithOneBlog)).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    })
  })

  test('when list has many blogs, equals the most liked', () => {
    expect(favoriteBlogs(blogs)).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    })
  })

  test('when list has no blogs, equals empty object', () => {
    expect(favoriteBlogs([])).toBe(0)
  })
})

describe('Most blogs', () => {
  test('when list has one blog, equals that {author, blogs}', () => {
    expect(
      mostBlogs([
        {
          _id: '5a422b3a1b54a676234d17f9',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0,
        },
      ])
    ).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('when list has many blogs, equals person {author, blogs} with the most blogs ', () => {
    expect(mostBlogs(blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })

  test('when list has no blogs, equals 0 ', () => {
    expect(mostBlogs([])).toBe(0)
  })
})

describe('Most liked blog', () => {
  test('when list has one blog, equals that {author, likes}', () => {
    expect(
      mostLikes([
        {
          _id: '5a422b3a1b54a676234d17f9',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0,
        },
      ])
    ).toEqual({ author: 'Edsger W. Dijkstra', likes: 12 })
  })

  test('when list has many blogs, equals person {author, likes} with the most likes', () => {
    expect(mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })

  test('when list has many blogs, equals person {author, likes} with the most likes', () => {
    expect(mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })

  test('when list has no blogs, equals person 0', () => {
    expect(mostLikes([])).toEqual(0)
  })
})
