const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let mostPopularBlog = null

  for (let blog of blogs){
    if (blog.likes > mostLikes){
      mostLikes = blog.likes
      mostPopularBlog = blog
    }
  }

  return mostPopularBlog
}

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author')
  const countsAsTuples = _.entries(counts)
  const maxTuple = _.maxBy(countsAsTuples, _.last)

  if(maxTuple === undefined){
    return undefined
  }

  return {
    author: _.head(maxTuple),
    blogs: _.last(maxTuple)
  }
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const blogsByAuthorAsEntries = _.entries(blogsByAuthor)
  const aggregatedLikes = _.map(blogsByAuthorAsEntries, (element) => [element[0], _.sumBy(element[1],'likes')])
  const maxTuple = _.maxBy(aggregatedLikes, _.last)
  if(maxTuple === undefined){
    return undefined
  }
  return {
    author: _.head(maxTuple),
    likes: _.last(maxTuple)
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}