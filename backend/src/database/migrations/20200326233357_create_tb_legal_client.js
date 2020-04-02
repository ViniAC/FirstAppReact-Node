exports.up = function (knex) {
    return knex.schema.createTable('tb_legal_client', function (table) {
        table.string('pk_id_legal_client').primary();
        table.string('cnpj', 14).notNullable();
        table.string('name', 200).notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();

    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tb_legal_client');
};
