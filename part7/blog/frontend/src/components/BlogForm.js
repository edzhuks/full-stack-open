import { useState } from "react";
import { Button, Grid, Input, Spacer } from "@nextui-org/react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogCreate = async (event) => {
    // event.preventDefault();
    const blog = {
      title: title,
      author: author,
      url: url,
    };
    await createBlog(blog);
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new</h2>
      <form>
        <Grid.Container gap={2}>
          <Grid xs={4}>
            <Input
              clearable
              underlined
              fullWidth
              type="text"
              value={title}
              name="Title"
              id="title"
              label="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Grid>
          <Grid xs={4}>
            <Input
              clearable
              underlined
              fullWidth
              type="text"
              value={author}
              name="Author"
              id="author"
              label="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Grid>
          <Grid xs={4}>
            <Input
              clearable
              underlined
              fullWidth
              type="text"
              value={url}
              name="URL"
              id="url"
              label="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Grid>
        </Grid.Container>
        <Spacer />
        <Button
          flat
          auto
          rounded
          color="success"
          onClick={handleBlogCreate}
          id="create-button"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
