const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const pk_id_legal_client = request.headers.authorization;

        const legal_client = await connection('tb_legal_client')
            .where('pk_id_legal_client', pk_id_legal_client)
            .select('*');

        return response.json(legal_client);
    }
}