import { useState } from 'react'


const BlogForm  = ( {BlogCreator} ) => {
    const [title, setTitle ] = useState('')
    const [author, setAuthor ] = useState('')
    const [url, setUrl ] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        BlogCreator({
            title: title,
            author: author,
            url: url,
            likes: 0
          })
          setTitle('')
          setAuthor('')
          setUrl('')
      }
      return (
        <form onSubmit={addBlog}>
            <h3>create new</h3>
            <div>
            title
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            />
            </div>
            <div>
            author
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            />
            </div>
            <div>
            url
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            />
            </div>
            <button type="submit">create</button>
        </form>
     )
}

export default BlogForm

