
exports.up = function(knex) {
    return knex.schema
        .createTable('booking', function(table) {
            table.integer('id').primary();
            table.integer('room_id').notNullable();
            table.integer('user_id').notNullable();
            table.integer('meeting_time').notNullable();
            // table.foreign('user_id').references('id').inTable('user').onUpdate('NO ACTION').onDelete('CASCADE');
            // table.foreign('room_id').references('id').inTable('meeting_room').onUpdate('NO ACTION').onDelete('CASCADE');
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("booking")
};
