const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

  
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('Getting blogs',()=>{
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })


  test('The unique identifier property is named id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0].id).toBeDefined()
  })
})
describe('adding blogs',()=>{
  test('adding blogs work', async() => {
    const blog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await Blog.find({})

    expect(updatedBlogs.length).toBe(helper.initialBlogs.length + 1)

    const existingBlogs = updatedBlogs.map(n => n.title)
    expect(existingBlogs).toContain('Canonical string reduction')
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {


    const blogsBeforeDeletion =  await helper.blogsInDb()
    const blogToDelete = blogsBeforeDeletion[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAfterDeletion = await helper.blogsInDb()
  
    expect(blogsAfterDeletion).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const title = blogsAfterDeletion.map(r => r.title)
  
    expect(title).not.toContain(blogToDelete.title)
  })
})

describe('Update a blog', () => {
  test('PUT api/Blogs/:id', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    
    blogToUpdate.title = 'ugabuga'
    
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const updatedBlogs = await helper.blogsInDb()
    const blogList = updatedBlogs.map(u => u.title)
    expect(blogList).toContain('ugabuga')
  })
})
  

afterAll(async () => {
  await mongoose.connection.close()
})