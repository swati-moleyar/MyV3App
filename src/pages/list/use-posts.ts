import { useEffect, useReducer } from "react";
import authenticatedFetch from "@iqmetrix/authenticated-fetch";
import { Post } from "models";

type State =
  | { status: "empty" }
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: Array<Post> };

type Action = { type: "load" } | { type: "success"; results: Array<Post> } | { type: "error"; error: string };

interface Options {
  query?: Record<string, string>;
}

const URL = "https://jsonplaceholder.typicode.com/posts";

export const usePosts = (options?: Options) => {
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "load":
        return { status: "loading" };
      case "success":
        return { status: "success", data: action.results };
      case "error":
        return { status: "error", error: action.error };
    }
  }
  const [state, dispatch] = useReducer(reducer, { status: "empty" });

  useEffect(() => {
    const searchParams = new URLSearchParams(options?.query || "");
    const doFetch = async () => {
      dispatch({ type: "load" });
      try {
        const res = await authenticatedFetch(`${URL}?${searchParams}`);
        if (!res.ok) throw res;
        const results = await res.json();
        dispatch({ type: "success", results });
      } catch (error:any) {
        dispatch({ type: "error", error });
      }
    };
    doFetch();
  }, [options]);

  return state;
};
