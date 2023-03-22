import { Card, Spacer } from "@nextui-org/react";
import { Link } from "react-router-dom";

const BlogListItem = ({ blog }) => {
  return (
    <div>
      <Card isHoverable>
        <Card.Body>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </Card.Body>
      </Card>
      <Spacer />
    </div>
  );
};

export default BlogListItem;
