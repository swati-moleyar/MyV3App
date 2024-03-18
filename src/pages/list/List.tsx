import React, { useContext, useState } from "react";

import { AuthContext } from "@iqmetrix/auth";
import { PageLayout } from "@iqmetrix/layout";
import { Alert, Typography, Card, Checkbox, Button, PageHeader, Table } from "@iqmetrix/antd";
import { RightOutlined } from "@iqmetrix/antd/icons";
import { Link } from "react-router-dom";

import { useFormatMessage } from "hooks";
import { usePosts } from "./use-posts";

const { Paragraph } = Typography;

export const List: React.FC = () => {
  const { user, env } = useContext(AuthContext);
  const [showMessage, setShowMessage] = useState(false);
  const posts = usePosts();

  const breadcrumb = {
    separator: <RightOutlined />,
    routes: [
      {
        path: "/",
        breadcrumbName: useFormatMessage("appName"),
      },
    ],
  };

  const actions = [
    <Button id="PrimaryAction" key="btnHeader1" type="primary" onClick={() => setShowMessage(true)}>
      {useFormatMessage("List.primaryAction")}
    </Button>,
    <Button id="SecondaryAction" key="btnHeader2" type="default" disabled>
      {useFormatMessage("List.secondaryAction")}
    </Button>,
  ];

  const nextSteps = [
    "Implement your app",
    "Configure your login info for cypress",
    "Write a test suite",
    "Setup a Azure DevOps Pipeline",
    "Add a BirdBrain entry",
    "Demo at a Hub Sync",
  ];

  const columns = [
    {
      title: useFormatMessage("List.table.id"),
      dataIndex: "id",
      key: "id",
      render: (id: number) => <Link to={`/${id}`}>{id}</Link>,
    },
    {
      title: useFormatMessage("List.table.title"),
      dataIndex: "title",
      key: "title",
    },
  ];

  const clickedMsg = useFormatMessage("List.alerts.clicked");
  const messages = [
    showMessage ? <Alert type="success" message={clickedMsg} /> : undefined,
    posts.status === "error" ? <Alert type="error" message={posts.error} /> : undefined,
  ];

  return (
    <PageLayout size="full">
      {{
        header: <PageHeader title={useFormatMessage("appName")} breadcrumb={breadcrumb} extra={actions} />,
        messages,
        content: [
          {
            primary: (
              <Table
                bordered
                loading={posts.status === "loading"}
                dataSource={posts.status === "success" ? posts.data : undefined}
                columns={columns}
              />
            ),
            secondary: [
              <Card key="cardSecondary1">
                <Paragraph className="user-data">
                  {useFormatMessage("List.greeting", {
                    name: user.firstName,
                    userName: user.userName,
                  })}
                </Paragraph>
                <Paragraph>{useFormatMessage("List.env", { env })}</Paragraph>
              </Card>,
              <Card key="cardSecondary2" title={useFormatMessage("List.nextSteps")}>
                <Checkbox.Group options={nextSteps} />
              </Card>,
            ],
          },
        ],
      }}
    </PageLayout>
  );
};
