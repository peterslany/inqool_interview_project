import React, { ReactElement } from "react";
import { Typography, Divider, Skeleton, Result, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface BasicUserInfoProps {
    username: string;
    loading: boolean;
    component: ReactElement;
    dividerText: string;
    error: { isError: boolean; message: string };
}

const LoadingInfo = (username: string) => (
    <>
        <Typography.Title level={4}>
            Loading {username}&apos;s data. <LoadingOutlined />
        </Typography.Title>
        <Skeleton active />
    </>
);

export const BasicUserInfo = (props: BasicUserInfoProps) => {
    if (props.error.isError) {
        return (
            <Result
                status="404"
                title={props.error.message}
                extra={
                    <Link to="/search">
                        <Button>Search again</Button>
                    </Link>
                }
            />
        );
    }
    return props.username === undefined ? (
        <Typography.Title>
            No user selected, please search for the user
            <Link to="/search"> here.</Link>
        </Typography.Title>
    ) : (
        <>
            <Typography.Title>User {props.username}</Typography.Title>
            <Divider orientation="left">{props.dividerText}</Divider>
            {props.loading ? LoadingInfo(props.username) : props.component}
        </>
    );
};
