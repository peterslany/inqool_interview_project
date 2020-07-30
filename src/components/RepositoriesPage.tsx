import React, { useState, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { UsernameContext } from "../App";
import { getRepos } from "../api/github-api";
import { BasicUserInfo } from "./BasicUserInfo";
import { Row, Card, Col, Typography, Divider } from "antd";
import {
    StarOutlined,
    ForkOutlined,
    EyeOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
interface MatchParams {
    username: string;
}

const Repositories = (props: any) => (
    <Row gutter={{ md: 24, sm: 1 }}>
        {props.data.map((repository: any) => (
            <Col
                sm={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
                key={repository.id}
                style={{ marginBottom: "30px" }}
            >
                <Card
                    title={repository.name}
                    hoverable
                    onClick={() => window.open(repository.html_url, "_blank")}
                >
                    <StarOutlined /> {repository.stargazers_count}
                    <Divider type="vertical" />
                    <EyeOutlined /> {repository.watchers}
                    <Divider type="vertical" />
                    <ForkOutlined /> {repository.forks}
                    <Divider type="vertical" />
                    <ExclamationCircleOutlined /> {repository.open_issues}
                    <br />
                    <Typography.Text strong>{repository.description}</Typography.Text>
                </Card>
            </Col>
        ))}
    </Row>
);

const RepositoriesPage = (props: RouteComponentProps<MatchParams>) => {
    const username = props.match.params.username;
    const [repositoriesData, setRepositoriesData] = useState({
        data: [],
        error: { isError: false, message: "" },
    });

    const usernameContext = useContext(UsernameContext);
    // sets global username based on URL path parameter
    usernameContext.setUsername!(username);

    useEffect(() => {
        if (username !== undefined) {
            fetchUserData();
        } // eslint-disable-next-line
    }, []);

    const fetchUserData = async () => {
        await getRepos(username)
            .then((response) => {
                setRepositoriesData({ ...repositoriesData, data: response });
            })
            .catch((error) =>
                setRepositoriesData({
                    ...repositoriesData,
                    error: { isError: true, message: error.message },
                })
            );
    };

    return (
        <BasicUserInfo
            error={repositoriesData.error}
            username={username}
            loading={repositoriesData.data.length === 0}
            component={<Repositories data={repositoriesData.data} />}
            dividerText="Repositories"
        />
    );
};
export default RepositoriesPage;
