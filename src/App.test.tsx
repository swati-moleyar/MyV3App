import { AuthContext, IUserModel } from "@iqmetrix/auth";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";

import { App } from "./App";
import { render } from "./test-utils/i18n";

// Memory router is used to test apps with routers: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/testing.md

const userContext = {
  isLoading: false,
  isLoaded: true,
  hasLoggedIn: true,
  user: {
    id: "100",
    parentEntityId: 100,
    userName: "test@test",
    isExternal: false,
    firstName: "Test",
  } as IUserModel,
  env: "int",
  error: "",
  envSuffix: "int",
};

describe("Examples", () => {
  it("renders without crashing", async () => {
    const { container } = render(
      <AuthContext.Provider value={userContext}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const user = container.getElementsByClassName("user-data");
    expect(user[0].textContent).toBe("Hello Test (test@test)");
  });
});
