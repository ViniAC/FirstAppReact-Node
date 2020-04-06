const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        
        const fk_id_legal_client = request.headers.authorization;

        const meals = await connection('tb_meal')
            .where('fk_id_legal_client', fk_id_legal_client)
            .select('*');

        return response.json(meals);
    }
}