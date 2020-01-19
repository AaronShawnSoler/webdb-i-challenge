const knex = require('knex');

const configOptions = require('../knexfile').development;

const db = knex(configOptions);

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}

function get() {
    return db('accounts');
}

function getById(id) {
    return db('accounts')
    .where({ id })
    .first();
}

function insert(account) {
    return db('accounts')
    .insert(account)
    .then(ids => {
        return getById(ids[0]);
    });
}

function update(accountID, changes) {
    return db('accounts')
    .where({ id: accountID })
    .update(changes);
}

function remove(id) {
    return db('accounts')
    .where('id', id)
    .del();
}