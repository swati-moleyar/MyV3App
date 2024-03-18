import React, { useContext } from "react";
import { withGARouter } from "@iqmetrix/analytics";
import { setTitle } from "@iqmetrix/set-title";
import { Result } from "@iqmetrix/antd";
import { AuthContext } from "@iqmetrix/auth";
import * as Sentry from "@sentry/react";
import ReactGA from "react-ga";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { List, View } from "./pages";

const title = "TODO: Set a Title";
function withTitle(Page: React.ComponentType) {
  const HOC: React.FC = props => {
    setTitle(title);
    return <Page {...props} />;
  };

  return HOC;
}

export const App: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    ReactGA.set({ userId: user.id });
    ReactGA.event({
      category: `EntityID ${user.parentEntityId}`,
      label: `UserID ${user.id}`,
      action: "App Accessed",
    });

    Sentry.configureScope((scope: Sentry.Scope) => {
      scope.setTag("Entity", user.parentEntityId.toString());
      scope.setUser({
        id: user.id,
        email: user.email || undefined,
        username: user.userName,
      });
    });
  }

  // Add your app's routes below
  // Routing Docs: https://reacttraining.com/react-router/web/guides/quick-start
  // Routing Standards: https://design-system.iqmetrix.net/docs/web-dev-docs/guides/routing-standards
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={withGARouter(withTitle(List))} />
        <Route exact path="/:id" component={withGARouter(withTitle(View))} />
        <Route component={() => <Result status="404" />} />
      </Switch>
    </Router>
  );
};
