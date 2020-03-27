
exports.up = function (knex) {
    return knex.schema.createTable('tb_meal', function (table) {
        table.increments('pk_id_meal');
        table.string('name', 200).notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('fk_id_legal_client').notNullable();
        table.foreign('fk_id_legal_client').references('pk_id_legal_client').inTable('tb_legal_client');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tb_meal');
};
