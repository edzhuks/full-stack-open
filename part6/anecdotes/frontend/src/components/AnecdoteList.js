import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from "../reducers/notificationReducer";
const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick()}>vote</button>
      </div>
    </div>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => anecdotes.filter(a => a.content.includes(filter)))
  return(
    <div>
      {anecdotes.sort((a,b) => b.votes-a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteForAnecdote(anecdote))
            dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
            }
          }
        />
      )}
    </div>
  )
}

export default Notes