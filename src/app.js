import { useSofa, OpenAPI } from 'sofa-api';
import { GraphQLServer } from 'graphql-yoga';
import { config } from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import swaggerUi from 'swagger-ui-express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Photon } from '@generated/photon';
import schema from './schema';

import swaggerDocument from './swagger.json';

config();
const openApi = OpenAPI({
  schema,
  info: {
    title: 'BloodHub API',
    version: '1.0.0',
  },
  openapi: '3.0.0',
});

const photon = new Photon();

async function getUser(authorization) {
  const bearerLength = 'Bearer '.length;
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength);
    const { ok, result } = await new Promise(resolve =>
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          resolve({
            ok: false,
            result: err,
          });
        } else {
          resolve({
            ok: true,
            result: payload,
          });
        }
      }),
    );
    if (ok) {
      const user = await photon.users.findOne({
        where: { email: result.email },
        include: { donor: true },
      });
      return user;
    }
    // eslint-disable-next-line no-console
    console.error(result);
    return null;
  }
  return null;
}

async function context({ request }) {
  const currentUser = await getUser(request.get('Authorization'));
  return {
    photon,
    currentUser,
  };
}
const server = new GraphQLServer({
  schema,
  context,
});
server.express.options('*', cors());

server.express.use(
  '/api',
  useSofa({
    onRoute(info) {
      openApi.addRoute(info, {
        basePath: '/api',
      });
    },
    schema,
    async context({ req }) {
      return {
        req,
        photon,
      };
    },
  }),
);

openApi.save('./src/swagger.json');

server.express.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);
const opts = {
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
};
server.start(opts, () =>
  // eslint-disable-next-line no-console
  console.log('Server is running on http://localhost:4000'),
);
