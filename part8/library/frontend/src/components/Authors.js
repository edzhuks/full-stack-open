import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`;

const Authors = () => {
  const [born, setBorn] = useState("");
  const [author, setAuthor] = useState("");
  const result = useQuery(ALL_AUTHORS);
  const [changeBorn] = useMutation(EDIT_BORN);
  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  function updateAuthor(event) {
    event.preventDefault();
    console.log(author);
    console.log(born);
    changeBorn({ variables: { name: author, setBornTo: Number(born) } });
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <select
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        >
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <br />
        born{" "}
        <input
          name="born"
          value={born}
          onChange={(event) => setBorn(event.target.value)}
        />
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
