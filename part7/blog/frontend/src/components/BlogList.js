import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { useMutation, useQuery, useQueryClient } from "react-query";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";
import { useRef } from "react";
import { Spacer } from "@nextui-org/react";
import BlogListItem from "./BlogListItem";

const BlogList = () => {
  const queryClient = useQueryClient();
  const blogFormRef = useRef();
  const notificationDispatch = useNotificationDispatch();

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });
  const result = useQuery("blogs", blogService.getAll);

  console.log(result);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  const handleBlogCreate = async (blog) => {
    blogFormRef.current.toggleVisibility();
    notificationDispatch({
      type: "SHOW",
      payload: {
        good: true,
        text: `a new blog ${blog.title} by ${blog.author} added`,
      },
    });
    setTimeout(() => {
      notificationDispatch({ type: "HIDE" });
    }, 5000);
    createBlogMutation.mutate(blog);
  };

  const sortedBlogs = (blogs) => {
    const copy = JSON.parse(JSON.stringify(blogs));
    copy.sort((a, b) => b.likes - a.likes);
    return copy;
  };

  const blogs = sortedBlogs(result.data);
  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleBlogCreate} />
      </Togglable>
      <Spacer />
      {blogs.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
