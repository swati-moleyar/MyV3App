import React from "react";

import { Result, ResultStatusErrorType } from "@iqmetrix/antd";
import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react";
import { ErrorBoundaryProps, FallbackRender } from "@sentry/react/dist/errorboundary";

import { FailedAuthClientResponseError } from "@iqmetrix/auth";

interface FallbackRenderErrorInfo {
  error: Error;
  componentStack: string | null;
  eventId: string | null;
  resetError(): void;
}

const fallback: FallbackRender = (errorInfo: FallbackRenderErrorInfo) => {
  let statusCode: ResultStatusErrorType, response: null | Response | string;

  if (errorInfo.error instanceof Response) {
    statusCode = errorInfo.error.status.toString() as ResultStatusErrorType;
    response = errorInfo.error;
  } else if (errorInfo.error instanceof FailedAuthClientResponseError) {
    statusCode = errorInfo.error.response.status.toString() as ResultStatusErrorType;
    response = errorInfo.error.response;
  } else {
    statusCode = "error" as ResultStatusErrorType;
    response = errorInfo.error.message;
  }

  errorInfo.resetError();

  return <Result icon={null} statusCode={statusCode} response={response} />;
};

export class ErrorBoundary extends SentryErrorBoundary {
  constructor(props: ErrorBoundaryProps) {
    super({ ...props, fallback });
  }
}
