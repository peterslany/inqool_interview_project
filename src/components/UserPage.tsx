import React, { useContext, useEffect, useState } from "react";
import { UsernameContext } from "../App";
import { getUserData } from "../api/github-api";
import UserAndOrganisations from "./UserAndOrganisations";
import { BasicUserInfo } from "./BasicUserInfo";
import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
    username: string;
}

const UserPage = (props: RouteComponentProps<MatchParams>) => {
    const username = props.match.params.username;
    const [userData, setUserData] = useState({
        data: { user: null, orgs: null },
        error: { isError: false, message: "" },
    });
    //sets global username based on query parameter
    const usernameContext = useContext(UsernameContext);
    usernameContext.setUsername!(username);

    useEffect(() => {
        if (username !== undefined) {
            fetchUserData();
        }// eslint-disable-next-line
    }, []);

    const fetchUserData = async () => {
        await getUserData(username)
            .then((response) => {
                setUserData({ ...userData, data: response });
            })
            .catch((error) => {
                setUserData({
                    ...userData,
                    error: { isError: true, message: error.message },
                });
            });
    };

    return (
        <BasicUserInfo
            error={userData.error}
            username={username}
            loading={userData.data.user === null}
            component={
                <UserAndOrganisations user={userData.data.user!} orgs={userData.data.orgs!} />
            }
            dividerText="User Information"
        />
    );
};
export default UserPage;
