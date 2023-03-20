import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getAnecdotes, voteForAnecdote} from "./requests";
import {useNotificationDispatch} from "./NotificationContext";

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const voteForAnecdoteMutation = useMutation(voteForAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    voteForAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    dispatch({type: "SHOW", payload: `voted anecdote ${anecdote.content}`})
    setTimeout(() => dispatch({type: "HIDE"}), 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes)

  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
