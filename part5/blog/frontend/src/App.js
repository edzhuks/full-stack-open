import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setMessage({ good: false, text: 'wrong username or password' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleBlogCreate = async (blog) => {
    const newBlog = await blogService.create(blog)
    blogFormRef.current.toggleVisibility()
    setMessage({ good: true, text: `a new blog ${newBlog.title} by ${newBlog.author} added` })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setBlogs(blogs.concat(newBlog))
  }

  const handleLike = async (blog) => {
    await blogService.like(blog)
    const copy = JSON.parse(JSON.stringify(blogs))
    const oldBlog = copy.find(b => b.id === blog.id)
    oldBlog.likes += 1
    setBlogs(sortedBlogs(copy))
  }

  const handleDelete = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortedBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortedBlogs = (blogs) => {
    const copy = JSON.parse(JSON.stringify(blogs))
    copy.sort((a,b) => b.likes - a.likes)
    return copy
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}/>
        <form>
          <div> username
            <input type="text" value={username} name="Username" id="username"
              onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div> password
            <input type="password" value={password} name="Password" id="password"
              onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button onClick={handleLogin}>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message}/>
      <p>{user.name} logged in <button onClick={logout}>logout</button> </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleBlogCreate}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} ownedByCurrentUser={user.username.toString() === blog.user.username.toString()}/>
      )}
    </div>
  )
}

export default App