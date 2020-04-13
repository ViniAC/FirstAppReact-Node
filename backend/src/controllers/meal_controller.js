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


    async index(request, response) {

        console.log(request.body);

        const meals = [];


        /* for (let i = 0; i < listOrder.length; i++) {

            meals = await connection('tb_meal')
                .where('pk_id_meal', listOrder[i].mealId)
                .join('tb_legal_client', 'pk_id_legal_client', '=', 'tb_meal.fk_id_legal_client')
                .select([
                    'tb_meal.pk_id_meal',
                    'tb_meal.name as meal_name',
                    'tb_meal.description',
                    'tb_meal.value',
                    'tb_meal.fk_id_legal_client',
                    'tb_legal_client.name as companie_name',
                    'tb_legal_client.email',
                    'tb_legal_client.whatsapp',
                    'tb_legal_client.city',
                    'tb_legal_client.uf'
                ]);
        }

        return response.json(meals); */
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