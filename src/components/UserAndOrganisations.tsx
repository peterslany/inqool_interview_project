import React from "react";
import { Row, Col, Typography, Divider, Statistic, Card } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "../styles/UserAndOrganisations.css";

interface UserAndOrgsProps {
    user: any;
    orgs: any;
}

interface OrganisationProps {
    id?: number;
    name: string;
    avatar: string;
    description: string;
}
const Organisation = (props: OrganisationProps) => (
    <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }} className="organisation">
        <Card cover={<img className="organisation-avatar" src={props.avatar} alt={props.name} />}>
            <Card.Meta
                style={{ textOverflow: "ellipsis" }}
                title={props.name}
                description={<p className="organisation--description">{props.description}</p>}
            />
        </Card>
    </Col>
);

const UserAndOrganisations: React.FC<UserAndOrgsProps> = (props: UserAndOrgsProps) => {
    const statsData = [
        ["Public repositories", props.user.public_repos],
        ["Public Gists", props.user.public_gists],
        ["Followers", props.user.followers],
        ["Following", props.user.following],
    ];

    const renderStatistics = (text: string, value: number) => (
        <Col xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 12 }} lg={{ span: 6 }} key={text}>
            <Statistic title={text} value={value} />
        </Col>
    );

    return (
        <div>
            <Row gutter={{ sm: 24, md: 12 }}>
                <Col className="gutter-row" sm={{ span: 24 }} md={{ span: 12 }}>
                    <Typography.Title level={3}>
                        <Row justify="space-between">
                            {props.user.name !== null ? props.user.name : null}
                            {props.user.location !== null ? (
                                <div>
                                    {props.user.location} <HomeOutlined />
                                </div>
                            ) : null}
                        </Row>
                    </Typography.Title>
                    <Row justify="center">
                        {statsData.map((array) => renderStatistics(array[0], array[1]))}
                    </Row>
                    <br />
                    {props.user.bio !== null ? (
                        <Typography.Title level={2} className="bio">
                            {props.user.bio}
                        </Typography.Title>
                    ) : null}
                </Col>
                <Col className="gutter-row" sm={{ span: 24 }} md={{ span: 12 }}>
                    <img
                        className="user-avatar"
                        src={props.user.avatar_url}
                        alt={`${props.user.name}'s avatar`}
                    />
                </Col>
            </Row>
            <Divider orientation="left">Organisations</Divider>
            <Row gutter={{ sm: 24, md: 12 }}>
                {props.orgs.map((organisation: any) => (
                    <Organisation
                        key={organisation.id}
                        name={organisation.login}
                        avatar={organisation.avatar_url}
                        description={organisation.description}
                    />
                ))}
            </Row>
        </div>
    );
};
export default UserAndOrganisations;
