
exports.up = function (knex) {
    return knex.schema.createTable('tb_order', function (table) {
        table.string('pk_id_order').notNullable();
        table.string('description').notNullable();
        table.float('unit_price').notNullable();
        table.float('item_price').notNullable();
        table.integer('quantity').notNullable();
        table.float('total_price').notNullable();
        table.timestamp('date');

        table.string('fk_id_legal_client').notNullable();
        table.foreign('fk_id_legal_client').references('pk_id_legal_client').inTable('tb_legal_client');

        table.string('fk_id_physical_client').notNullable();
        table.foreign('fk_id_physical_client').references('pk_id_physical_client').inTable('tb_physical_client');

        table.string('fk_id_meal').notNullable();
        table.foreign('fk_id_meal').references('pk_id_meal').inTable('tb_meal');

    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tb_order');
};
