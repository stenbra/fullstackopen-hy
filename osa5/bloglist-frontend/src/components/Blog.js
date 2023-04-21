import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const buttonLabel = visible ? "hide" :"view"
  const blog = props.blog
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const Like = () => {
    const likedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(likedBlog)
  }

  const removeBlog = () => props.deleteBlog(blog)

  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes == undefined || blog.likes == null || blog.likes == NaN ? 0: blog.likes}<button onClick={Like}>like</button></p>
        {blog.user ?<p>{blog.user.name}</p>:""}
        <button onClick={removeBlog}>remove</button>
      </div>
    </div> 
  )
}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog