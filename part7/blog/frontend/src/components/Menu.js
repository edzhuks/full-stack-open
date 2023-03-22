import { Link } from "react-router-dom";
import { useUserValue } from "../UserContext";
import { useTheme as useNextTheme } from "next-themes";
import { Button, Navbar, Switch, Text, useTheme } from "@nextui-org/react";

const Menu = ({ logout }) => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const user = useUserValue();
  return (
    <div>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            BlogApp
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Link to="/">blogs</Link>
          <Link to="/users">users</Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <span>{user.name} logged in</span>
          </Navbar.Item>
          <Button onClick={logout}>logout</Button>
          <Navbar.Item>
            <Switch
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </div>
  );
};

export default Menu;
