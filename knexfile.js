'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'commentgres://localhost/climb2health2_dev'
  },

  test: {
    client: 'pg',
    connection: 'commentgres://localhost/climb2health2_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
