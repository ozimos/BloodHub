import * as path from 'path';
import { makeSchema } from 'nexus';
// eslint-disable-next-line import/no-extraneous-dependencies
import { nexusPrismaPlugin } from 'nexus-prisma';
import Mutation from './mutation';
import Query from './query';
import models from './models';

export default makeSchema({
  types: [Query, Mutation, ...models],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    typegen: path.join(
      __dirname,
      '../node_modules/@types/nexus-typegen/index.d.ts',
    ),
  },
});
