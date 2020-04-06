const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const pk_id_physical_client = request.headers.authorization;

        const physical_client = await connection('tb_physical_client')
            .where('pk_id_physical_client', pk_id_physical_client)
            .select('*');

        return response.json(physical_client);
    }
}