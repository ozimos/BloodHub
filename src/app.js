import { useSofa, OpenAPI } from "sofa-api";
import { GraphQLServer } from "graphql-yoga";
import { config } from "dotenv";
import swaggerUi from "swagger-ui-express";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Photon } from "@generated/photon";
import schema from "./schema";

import swaggerDocument from "./swagger.json";

config();
const openApi = OpenAPI({
  schema,
  info: {
    title: "BloodHub API",
    version: "1.0.0"
  },
  openapi: "3.0.0"
});

const photon = new Photon();

const server = new GraphQLServer({
  schema,
  context: { photon }
});

server.express.use(
  "/api",
  useSofa({
    onRoute(info) {
      openApi.addRoute(info, {
        basePath: "/api"
      });
    },
    schema,
    async context({ req }) {
      return {
        req,
        photon
      };
    }
  })
);

openApi.save("./src/swagger.json");

server.express.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.start(() => console.log("Server is running on http://localhost:4000"));
