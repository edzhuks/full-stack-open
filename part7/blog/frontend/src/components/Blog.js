import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import {
  Button,
  Card,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";

const Blog = () => {
  const id = useParams().id;
  const result = useQuery("blog", () => blogService.getById(id));
  const queryClient = useQueryClient();

  const [newComment, setComment] = useState("");

  const likeBlogMutation = useMutation(blogService.like, {
    onSuccess: () => {
      queryClient.invalidateQueries("blog");
    },
  });
  const commentOnBlogMutation = useMutation(blogService.comment, {
    onSuccess: () => {
      queryClient.invalidateQueries("blog");
    },
  });

  const handleLike = async () => {
    likeBlogMutation.mutate(blog);
  };
  const handleAddComment = async (event) => {
    event.preventDefault();
    commentOnBlogMutation.mutate({ id: blog.id, comment: newComment });
  };

  if (result.isLoading) {
    return <p>loading blog...</p>;
  }
  const blog = result.data;
  return (
    <div>
      <Spacer />
      <h2>Blog</h2>
      <Grid.Container gap={2}>
        <Grid xs={12} sm={6} style={{ display: "block" }}>
          <Card>
            <Card.Header>
              <Text b>
                {blog.title} {blog.author}
              </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <a href={blog.url}>{blog.url}</a>
              <Text> added by {blog.user.name}</Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="space-between">
                <Text>{blog.likes} likes</Text>
                <Button
                  flat
                  rounded
                  auto
                  color="error"
                  onClick={() => handleLike()}
                >
                  like
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <Card>
            <Card.Header>
              <Text b>comments</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <ul>
                {blog.comments.map((comment) => (
                  <li key={comment}>{comment}</li>
                ))}
              </ul>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <form onSubmit={handleAddComment}>
                <Input
                  fullWidth
                  type="text"
                  name="comment"
                  value={newComment}
                  onChange={(event) => setComment(event.target.value)}
                  contentRight={
                    <Button flat rounded auto color="success" type="submit">
                      add comment
                    </Button>
                  }
                />
              </form>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  );
};

Blog.protoTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  ownedByCurrentUser: PropTypes.bool.isRequired,
};

export default Blog;
