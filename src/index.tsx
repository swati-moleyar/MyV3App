import "@iqmetrix/antd/dist/antd.css";
import "core-js";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import { Auth } from "@iqmetrix/auth";
import getEnvironment from "@iqmetrix/get-environment";
import redirectToShell from "@iqmetrix/redirect-to-shell";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import * as React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

import { App } from "./App";
import { ErrorBoundary, I18nProvider, Profiler } from "./components";
import * as serviceWorker from "./serviceWorker";
import { TrackerId } from "./shared";

async function init() {
  // Redirect to the shell if the app is opened directly
  await redirectToShell();

  if (process.env.NODE_ENV === "development") {
    await import("react-devtools");
  } else {
    const info = await import("../package.json");

    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      release: info.name + "@" + info.version,
      environment: await getEnvironment(),
      attachStacktrace: true,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 0.1,
    });
    ReactGA.initialize(TrackerId);
  }

  ReactDOM.render(
    <Profiler>
      <ErrorBoundary>
        <I18nProvider>
          <Auth>
            <App />
          </Auth>
        </I18nProvider>
      </ErrorBoundary>
    </Profiler>,
    document.getElementById("root")
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}

init();
