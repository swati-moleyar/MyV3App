import React from "react";

import { Profiler as SentryProfiler } from "@sentry/react";

const onRenderCallback: React.ProfilerOnRenderCallback = (id, phase, actualDuration) =>
  console.info(`Phase: ${phase}, Duration: ${actualDuration.toFixed(2)}ms`);

interface ProfileProps {
  children?: React.ReactNode;
}

export const Profiler: React.FC<ProfileProps> = ({ children }: ProfileProps) => (
  <SentryProfiler>
    {process.env.NODE_ENV === "development" ? (
      <React.Profiler id="application" onRender={onRenderCallback}>
        {children}
      </React.Profiler>
    ) : (
      children
    )}
  </SentryProfiler>
);
