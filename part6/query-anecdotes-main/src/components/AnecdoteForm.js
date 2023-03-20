import {useMutation, useQueryClient} from "react-query";
import {createAnecdote} from "../requests";
import {useNotificationDispatch} from "../NotificationContext";

const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({type: "SHOW", payload: `added anecdote ${data.content}`})
      setTimeout(() => dispatch({type: "HIDE"}), 5000)
    }, onError: () => {
      dispatch({type: "SHOW", payload: `anecdote too short, must have length 5+`})
      setTimeout(() => dispatch({type: "HIDE"}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
