exports.up = function (knex) {
    return knex.schema.createTable('tb_physical_client', function (table) {
        table.increments('pk_id_physical_client').primary();
        table.string('cpf', 11).notNullable();
        table.string('name', 200).notNullable();
        table.string('email').notNullable();
        table.date('date_birth').notNullable();
        table.string('password').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tb_physical_client');
};
