
exports.up = function(knex) {
    return knex.schema
        .createTable('booking', function(table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.timestamp('time_start', { useTz: false }).notNullable();
            table.timestamp('time_end', { useTz: false }).notNullable();
            table.integer('user_id').unsigned().references('id').inTable('user').onUpdate('NO ACTION').onDelete('CASCADE').notNullable();
            table.string('room_id').unsigned().references('name').inTable('meeting_room').onUpdate('NO ACTION').onDelete('CASCADE').notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("booking")
};
