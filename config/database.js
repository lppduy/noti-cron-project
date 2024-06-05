const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vp-db', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = {
  development: {
    username: 'postgres',
    password: '',
    database: 'vp-db',
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: '',
    database: 'vp-db',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: '',
    database: 'vp-db',
    host: 'localhost',
    dialect: 'postgres'
  },
  sequelize,
};
