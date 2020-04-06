const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const pk_id_physical_client = request.headers.authorization;

        const physical_client = await connection('tb_physical_client')
            .where('pk_id_physical_client', pk_id_physical_client)
            .select('*');

        return response.json(physical_client);
    },

    async update(request, response) {
        const { name, cpf, email, date_birth, password, pk_id_physical_client, newEmail } = request.body;

        const update_user = await connection('tb_physical_client')
            .where('pk_id_physical_client', pk_id_physical_client)
            .and
            .where('email', email)
            .and
            .where('password', password)
            .update({ name: name, cpf: cpf, email: newEmail, date_birth: date_birth});

            return response.json(update_user);
    }
}