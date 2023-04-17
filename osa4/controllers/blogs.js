const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blog = await Blog.find({})
    // .then(blogs => {
    //   response.json(blogs)
    // })
  response.json(blog)
})
  
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter