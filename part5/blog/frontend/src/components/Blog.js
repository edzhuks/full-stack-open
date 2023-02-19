import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, ownedByCurrentUser }) => {

  const [expanded, setExpanded] = useState(false)



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='always-visible'>
        {blog.title} {blog.author}
        <button className='view-button' onClick={() => setExpanded(!expanded)}>{expanded?'hide': 'view'}</button>
      </div>
      {expanded &&
        <div className='expanded-part'>
          {blog.url}<br/>
          likes {blog.likes} <button className='like-button' onClick={() => handleLike(blog)}>like</button><br/>
          {blog.user.name}<br/>
          {ownedByCurrentUser && <button onClick={() => handleDelete(blog)}>remove</button>}
        </div>
      }
    </div>
  )
}

Blog.protoTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  ownedByCurrentUser: PropTypes.bool.isRequired
}

export default Blog