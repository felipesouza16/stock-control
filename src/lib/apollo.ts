import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env["STOCK_API"],
  cache: new InMemoryCache({}),
  credentials: "include",
});
