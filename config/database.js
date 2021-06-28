const knex = require('knex');
const variaveisAmbiente = require('./variavelAmbiente');
const host = variaveisAmbiente.BANCODADOS;
const user = 'root';
const password = '';

module.exports = {
    host: host,
    user: user,
    password: password,
    cliente: function(database) {
        return knex({
            client: 'mysql',
            version: '5.7',
            connection: {
                host : host,
                user : user,
                password : password,
                database : database
            }
        });
    },
    produto: function(database) {
        return knex({
            client: 'mysql',
            version: '5.7',
            connection: {
                host : host,
                user : user,
                password : password,
                database : database
            }
        });
    },
    migration: function(database) {
        return knex({
            client: 'mysql',
            version: '5.7',
            connection: {
                host : host,
                user : user,
                password : password,
                database : database
            },
            migrations: {
              tableName: 'migrations'
            }
        });
    }
};
