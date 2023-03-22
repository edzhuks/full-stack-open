import { useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import { useUserDispatch, useUserValue } from "./UserContext";
import Menu from "./components/Menu";
import UserList from "./components/UserList";
import { Route, Routes } from "react-router-dom";
import User from "./components/User";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import { Container } from "@nextui-org/react";

const App = () => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
    }
  }, [userDispatch]);

  const logout = () => {
    window.localStorage.removeItem("user");
    userDispatch({ type: "LOGOUT" });
  };

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <Container>
      <Menu logout={logout} />
      <Notification />
      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </Container>
  );
};

export default App;
