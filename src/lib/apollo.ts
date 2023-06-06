import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.VITE_REACT_APP_API_URL,
  cache: new InMemoryCache({}),
  credentials: "include",
});
