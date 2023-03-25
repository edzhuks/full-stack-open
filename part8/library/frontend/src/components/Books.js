import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`;

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

const Books = () => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, { variables: { genre } });
  const genres_result = useQuery(ALL_GENRES);

  if (result.loading || genres_result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const genres = genres_result.data.allGenres;

  return (
    <div>
      <h2>books</h2>
      <p>
        {genre ? (
          <>
            in genre <b>{genre}</b>
          </>
        ) : (
          "in all genres"
        )}
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
