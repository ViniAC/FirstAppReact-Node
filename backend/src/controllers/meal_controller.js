const connection = require('../database/connection')

module.exports = {

    async index(request, response) {

        const pk_id_meal = request.headers.authorization;

        const meal = await connection('tb_meal')
            .where('pk_id_meal', pk_id_meal)
            .select('*');

        return response.json(meal);
    },

    async update(request,response) {
        const { pk_id_meal, name, description, value } = request.body;
            
        const update_meal = await connection('tb_meal')
            .where('pk_id_meal', pk_id_meal)
            .update({ name: name, description:description, value:value })
            
        return response.json(update_meal);

    },

    async create(request, response) {
        const { name, description, value } = request.body;
        const fk_id_legal_client = request.headers.authorization;

        if(name != '' && description != ''){
          const [pk_id_meal] = await connection('tb_meal').insert({
            name,
            description,
            value,
            fk_id_legal_client,
        });
        return response.json({ fk_id_legal_client, pk_id_meal });  
        }else{
            return response.json('You are leigo, insert direito.!?')
        }

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