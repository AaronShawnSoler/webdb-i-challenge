const knex = require('knex');

const configOptions = require('../knexfile').development;

const db = knex(configOptions);

module.exports = {
    get
}

function get() {
    return db('accounts');
}