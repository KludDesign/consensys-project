
exports.up = function(knex) {
    return knex.schema
        .createTable('meeting_room', function(table) {
            table.string('name', 255).primary().notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("meeting_room")
};
