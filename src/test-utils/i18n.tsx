import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { messages as defaultMessages } from "../shared";

interface WrapperProps {
  children?: React.ReactNode;
}

function render(ui: any, { locale = "en", messages = defaultMessages["en"], ...renderOptions } = {}) {
  const Wrapper: React.FC<WrapperProps> = ({ children }: WrapperProps) => {
    return (
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
