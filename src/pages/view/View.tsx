import React from "react";

import { PageLayout } from "@iqmetrix/layout";
import { PageHeader } from "@iqmetrix/antd";
import { RightOutlined } from "@iqmetrix/antd/icons";
import { useParams } from "react-router-dom";
import { useFormatMessage } from "hooks";

export const View: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const title = useFormatMessage("View.title", { id });

  const breadcrumb = {
    separator: <RightOutlined />,
    routes: [
      {
        path: "/",
        breadcrumbName: useFormatMessage("appName"),
      },
      {
        path: `/${id}`,
        breadcrumbName: title,
      },
    ],
  };

  return (
    <PageLayout size="full">
      {{
        header: <PageHeader title={title} breadcrumb={breadcrumb} />,
        content: [
          {
            primary: (
              <p>
                I am baby copper mug before they sold out retro venmo williamsburg franzen distillery pinterest. Schlitz
                messenger bag iPhone raclette umami. Tattooed la croix adaptogen, copper mug viral try-hard typewriter
                taiyaki offal farm-to-table artisan. Pabst normcore bicycle rights tousled kinfolk, narwhal seitan
                pop-up disrupt pork belly woke poke kogi.
              </p>
            ),
          },
        ],
      }}
    </PageLayout>
  );
};
