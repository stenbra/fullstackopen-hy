const blogsRouter = require('express').Router()
const { request, response } = require('../app')
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


blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(updatedBlog)
})



module.exports = blogsRouter