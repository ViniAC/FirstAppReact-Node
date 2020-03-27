const connection = require('../database/connection')
const crypto = require('crypto');

module.exports = {

    async create(request, response) {
        const { name, description, value } = request.body;
        const fk_id_legal_client = request.headers.authorization;

        const [pk_id_meal] = await connection('tb_meal').insert({
            name,
            description,
            value,
            fk_id_legal_client,
        });
        return response.json({ fk_id_legal_client, pk_id_meal });
    },


    async index(request, response) {

        const { page = 1 } = request.query;

        const [count] = await connection('tb_meal').count('pk_id_meal');

        const meals = await connection('tb_meal')
            .join('tb_legal_client', 'pk_id_legal_client', '=', 'tb_meal.fk_id_legal_client')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'tb_meal.pk_id_meal',
                'tb_meal.name as meal name',
                'tb_meal.description',
                'tb_meal.value',
                'tb_meal.fk_id_legal_client',
                'tb_legal_client.name',
                'tb_legal_client.email',
                'tb_legal_client.whatsapp',
                'tb_legal_client.city',
                'tb_legal_client.uf'

            ]);

        response.header('X-Total-Count', count['count(`pk_id_meal`)']);

        return response.json(meals);
    },


    async delete(request, response) {
        const { pk_id_meal } = request.params;
        const fk_id_legal_client = request.headers.authorization;

        const meal = await connection('tb_meal')
            .where('pk_id_meal', pk_id_meal)
            .select('fk_id_legal_client')
            .first();

        if (meal.fk_id_legal_client !== fk_id_legal_client) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('tb_meal').where('pk_id_meal', pk_id_meal).delete();

        return response.status(204).send();
    }
}