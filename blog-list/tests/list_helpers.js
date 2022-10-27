const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, curr) => sum + curr.likes, 0)
}

const favoriteBlogs = (blogs) => {
  return blogs.reduce((prev, curr) => {
    if (!prev.likes) {
      return curr
    }

    return prev.likes > curr.likes ? prev : curr
  }, 0)
}

const mostBlogs = (blogs) => {
  const authors = []
  blogs.forEach((blog) => {
    const exsitingAuthor = authors.find((entry) => entry.author === blog.author)
    if (exsitingAuthor) {
      exsitingAuthor.blogs += 1
    } else {
      authors.push({ author: blog.author, blogs: 1 })
    }
  })

  return authors.reduce((prev, curr) => {
    if (!prev.blogs) {
      return curr
    }
    return prev.blogs > curr.blogs ? prev : curr
  }, 0)
}

const mostLikes = (blogs) => {
  const authors = []
  blogs.forEach((blog) => {
    const exsitingAuthor = authors.find((entry) => entry.author === blog.author)
    if (exsitingAuthor) {
      exsitingAuthor.likes += blog.likes
    } else {
      authors.push({ author: blog.author, likes: blog.likes })
    }
  })
  return authors.reduce((prev, curr) => {
    if (!prev.likes) {
      return curr
    }
    return prev.likes > curr.likes ? prev : curr
  }, 0)
}

module.exports = { dummy, totalLikes, favoriteBlogs, mostBlogs, mostLikes }
