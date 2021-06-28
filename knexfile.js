// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'luizalabs',
      user:     'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
