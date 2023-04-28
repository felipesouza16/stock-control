import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { User } from "./schema/user.schema";
import Context from "./types/context";
import { verifyJwt } from "./utils/jwt";
import { connectToMongoDB } from "./utils/mongo";

async function main() {
  const schema = await buildSchema({
    resolvers,
    // emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    // authChecker,
  });

  const app = express();
  app.use(cookieParser());
  app.set("Access-Control-Allow-Origin", ["http://localhost:5173"]);
  app.set("Access-Control-Allow-Credentials", true);

  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      const context = ctx;

      if (ctx.req.cookies.accessToken) {
        const user = verifyJwt<User>(ctx.req.cookies.accessToken);
        context.user = user;
      }
      return context;
    },
  });

  await server.start();
  const corsOptions = {
    origin: [
      "https://studio.apollographql.com",
      "http://localhost:4000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  };

  server.applyMiddleware({
    app,
    cors: corsOptions,
  });

  app.listen({ port: 4000 }, () => {
    console.log(`App is listening on http://localhost:4000`);
  });

  connectToMongoDB();
}

main();
