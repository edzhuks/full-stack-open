import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreate = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }
    await createBlog(blog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form >
        <div> title:
          <input type="text" value={title} name="Title" id="title"
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div> author:
          <input type="text" value={author} name="Author" id="author"
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div> url:
          <input type="text" value={url} name="URL" id="url"
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button onClick={handleBlogCreate} id="create-button">create</button>
      </form>
    </div>
  )
}

export default BlogForm