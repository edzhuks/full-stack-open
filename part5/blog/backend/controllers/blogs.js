const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')
const { userExtractor } = require('../utils/middleware')




blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)

})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(404).json({ errpr: 'the blog post does not exist' })
  }
  if (blog.user.toString() === request.user.id.toString()) {
    const blog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).json(blog)
    return
  }
  response.status(401).json({ error: 'only the user who created the blog can delete it' })
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const newBlog =
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter