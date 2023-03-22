import Notification from "./Notification";
import { useUserDispatch } from "../UserContext";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";
import { useState } from "react";

const LoginForm = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: "LOGIN", payload: user });
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      notificationDispatch({
        type: "SHOW",
        payload: { good: false, text: "wrong username or password" },
      });
      setTimeout(() => {
        notificationDispatch({ type: "HIDE" });
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form>
        <div>
          {" "}
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          {" "}
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button onClick={handleLogin}>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
