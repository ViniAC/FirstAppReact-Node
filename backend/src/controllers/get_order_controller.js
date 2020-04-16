const connection = require('../database/connection');

module.exports = {
  async index(request, response) {

    let meals = [];
    let aux = [];

    for (let i = 0; i < request.body.length; i++) {

      aux = await connection('tb_meal')
        .where('pk_id_meal', request.body[i].mealId)

        .select([
          'tb_meal.pk_id_meal',
          'tb_meal.name as meal_name',
          'tb_meal.description',
          'tb_meal.value',
          'tb_meal.fk_id_legal_client'

        ]);

      aux = (Object.assign(aux[0], { quantity: request.body[i].qt }))

      meals.push(aux);
    }

    return response.json(meals);
  },
}