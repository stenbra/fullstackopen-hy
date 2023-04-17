const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blog = await Blog.find({})
  response.json(blog)
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const addedBlog=await blog.save()
  response.status(201).json(addedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter