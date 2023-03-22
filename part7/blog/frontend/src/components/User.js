import { useQuery } from "react-query";
import userService from "../services/users";
import { useParams } from "react-router-dom";
import BlogListItem from "./BlogListItem";

const User = () => {
  const id = useParams().id;
  const result = useQuery("user", () => userService.getAllBlogsByUser(id));

  if (result.isLoading) {
    return (
      <div>
        <h2>Users</h2>
        <p>loading users...</p>
      </div>
    );
  }
  const blogs = result.data.blogs;
  return (
    <div>
      <h2>{result.data.name}</h2>
      <h3>added blogs</h3>
      {blogs.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default User;
