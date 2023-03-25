import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Route, Routes, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import FavoriteBooks from './components/FavoriteBooks'
import { ALL_BOOKS } from './components/Books'
import { useQuery, useMutation, useSubscription, gql } from '@apollo/client'
export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            published
            author {
                name
            }
        }
    }
`

const App = () => {
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            const book = data.data.bookAdded
            console.log()

            // window.alert(`new book ${book.title} by ${book.author.name} added`)
            console.log(client.cache)
            client.cache.updateQuery(
                { query: ALL_BOOKS, variables:{genre:null} },
                // {variables: {genre: null}},
                ({allBooks}) => {
                    return { allBooks: allBooks.concat(book) }
                }
            )
        },
    })

    const logout = () => {
        console.log('bleep')
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            <div>
                <Link to="/authors">
                    <button>authors</button>
                </Link>
                <Link to="/books">
                    <button>books</button>
                </Link>
                {token ? (
                    <>
                        <Link to="/add">
                            <button>add book</button>
                        </Link>

                        <Link to="/recommended">
                            <button>recommended</button>
                        </Link>
                        <Link onClick={logout} to="/login">
                            <button>logout</button>
                        </Link>
                    </>
                ) : (
                    <Link to="/login">
                        <button>login</button>
                    </Link>
                )}
            </div>
            <Routes>
                <Route path="/authors" element={<Authors />} />
                <Route path="/books" element={<Books />} />
                <Route path="/add" element={<NewBook />} />
                <Route path="/recommended" element={<FavoriteBooks />} />
                <Route
                    path="/login"
                    element={<LoginForm setToken={setToken} />}
                />
            </Routes>
        </div>
    )
}

export default App
