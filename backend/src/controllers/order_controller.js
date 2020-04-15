const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {

        const order = request.body;
        const physical_client_id = request.headers.authorization;

        let total_price = calculateTotalPriceOrder(order);
        let item_prices = calculaItemPriceOrder(order);

        const mensage_success = 'Pedido criado com sucesso!';

        let date = new Date();

        const pk_id_order = crypto.randomBytes(4).toString('HEX');

        for (let i = 0; i < order.length; i++) {
            await connection('tb_order').insert({
                pk_id_order,
                description: order[i].description,
                unit_price: order[i].value,
                item_price: item_prices[i].item_price,
                total_price,
                quantity: order[i].quantity,
                date,
                fk_id_legal_client: order[i].fk_id_legal_client,
                fk_id_physical_client: physical_client_id,
                fk_id_meal: order[i].pk_id_meal
            })
        }

        return response.json({ mensage_success, pk_id_order });
    },

    async index(request, response) {
        const pk_id_order = request.headers.authorization;

        const order = await connection('tb_order')
            .where('pk_id_order', pk_id_order)
            .select('*');

        return response.json(order);
    },
}

function calculateTotalPriceOrder(order) {

    let item_price = 0;
    let total_price = 0

    for (let i = 0; i < order.length; i++) {
        item_price = order[i].value * order[i].quantity

        total_price = total_price + item_price;
    }
    return (total_price)
}

function calculaItemPriceOrder(order) {

    let item_price;
    let all_items_prices = []

    for (let i = 0; i < order.length; i++) {

        item_price = 0;

        item_price = order[i].value * order[i].quantity

        all_items_prices.push({
            item_price: item_price,
        })
    };

    return all_items_prices;
}



