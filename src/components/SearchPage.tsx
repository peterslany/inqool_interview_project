import React from "react";
import { Input, Typography } from "antd";
import { useHistory } from "react-router-dom";
import "../styles/SearchPage.css";

const SearchPage = () => {
    const history = useHistory();

    const onSearchAction = (value: string) => {
        history.push(`/user/${value}`);
    };
    return (
        <div className="searchpage">
            <Typography.Title className="title">
                Search for the GitHub user that you want to see information about
            </Typography.Title>
            <Input.Search
                className="searchbar"
                placeholder="Enter GitHub username"
                onSearch={onSearchAction}
                enterButton
            />
        </div>
    );
};
export default SearchPage;
