import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS, ALL_GENRES } from "./Books";

export const FAVORITE_BOOKS = gql`
  query {
    favoriteBooks {
      title
      author {
        name
      }
      published
    }
  }
`;

const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

const FavoriteBooks = () => {
  const result = useQuery(FAVORITE_BOOKS);
  const meResult = useQuery(ME);

  if (result.loading || meResult.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.favoriteBooks;
  const me = meResult.data.me;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre genre <b>{me.favoriteGenre}</b>
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
    </div>
  );
};

export default FavoriteBooks;
