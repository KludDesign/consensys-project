
exports.up = function(knex) {
    return knex.schema
        .createTable('user', function(table) {
            table.integer('id').primary();
            table.string('first_name', 255).notNullable();
            table.string('last_name', 255).notNullable();
            table.string('email', 255).notNullable();
            table.string('password', 255).notNullable();
            table.integer('company').notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("user")
};
