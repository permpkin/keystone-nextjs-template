/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from '@keystone-6/core';

import { lists } from './src/schema';

import { withAuth, session } from './src/auth';

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./.data/keystone.db',
    },
    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
    storage: {
      local: {
        kind: 'local',
        type: 'image',
        generateUrl: path => `http://localhost:3000/images${path}`,
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      },
    },
    lists,
    session,
  })
);