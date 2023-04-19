import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}
const SuccNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='succ'>
      {message}
    </div>
  )
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [succMessage, setSuccMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => 
  {
    async function FetchData(){
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    FetchData()
  }, [])
  useEffect(() => 
  {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }  
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <h2>Login to application</h2>
        <Notification message={errorMessage} />
        <div>
          username
          <input
           type="text"
           value={username}
           name="Username"
           onChange={({ target }) => setUsername(target.value)}
           />
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
    </form>
  )
  const showBlogs = () =>(
    <div>
      <h2>blogs</h2>
      <SuccNotification message={succMessage} />
      <div>
        <form onSubmit={logout}><p>{user.name} logged in <button>logout</button></p></form>
      </div>
      <BlogForm BlogCreator={createBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } 
    catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const logout=()=>{
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  const createBlog = async (event) =>{
    const newBlog = await blogService.create(event)
    setBlogs(blogs.concat(newBlog))
    setSuccMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccMessage(null)
      }, 5000)
  }

  return (
    <div>
        {user === null && loginForm()}
        {user && <div>
         {showBlogs()}
      </div>
    }   
    </div>
  )
}

export default App