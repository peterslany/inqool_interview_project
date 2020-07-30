import React, { useContext } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { UsernameContext } from "../App";
import { SearchOutlined, UserOutlined, ApartmentOutlined } from "@ant-design/icons";

const Item = Menu.Item;

//Returns router path with searched username
const linkWithUsername = (username: string | undefined, link: string) =>
    username === undefined ? link : `${link}/${username}`;

const Navbar = () => {
    const usernameContext = useContext(UsernameContext);
    return (
        <Menu className="navbar" mode="inline" selectable={false}>
            <Item key={0} icon={<SearchOutlined />}>
                <Link to="/search">Search</Link>
            </Item>
            <Item key={1} icon={<UserOutlined />}>
                <Link to={linkWithUsername(usernameContext.username, "/user")}>User</Link>
            </Item>
            <Item key={2} icon={<ApartmentOutlined />}>
                <Link to={linkWithUsername(usernameContext.username, "/repositories")}>
                    Repositories
                </Link>
            </Item>
        </Menu>
    );
};
export default Navbar;
