const connection = require('../database/connection')

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