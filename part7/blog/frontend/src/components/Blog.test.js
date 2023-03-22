import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "Component testing",
  author: "Blog author",
  url: "localhost",
  likes: 11,
  user: {
    name: "Superuser",
  },
};

test("renders title and author only", () => {
  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".always-visible");
  expect(div).toBeDefined();
  expect(div).toHaveTextContent("Component testing Blog author");
  const invisibleDiv = container.querySelector(".expanded-part");
  expect(invisibleDiv).toBeNull();
});

test("clicking the view button shows url and likes", async () => {
  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".always-visible");
  expect(div).toBeDefined();
  expect(div).toHaveTextContent("Component testing Blog author");
  const expandedPart = container.querySelector(".expanded-part");
  expect(expandedPart).toBeDefined();
  expect(expandedPart).toHaveTextContent("localhostlikes 11 likeSuperuser");
});

test("like button clicks", async () => {
  const mockHandler = jest.fn();
  render(<Blog blog={blog} handleLike={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
