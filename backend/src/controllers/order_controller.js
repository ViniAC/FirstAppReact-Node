const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {

        const order = request.body;
        const physical_client_id = request.headers.authorization;
        console.log(order);
        let total_price = calculateTotalPriceOrder(order);
        let item_prices = calculaItemPriceOrder(order);
        let status = 'em_andamento';

        const message_success = 'Pedido realizado com sucesso!';

        let date = new Date();

        const pk_id_order = crypto.randomBytes(4).toString('HEX');

        for (let i = 0; i < order.length; i++) {
            await connection('tb_order').insert({
                pk_id_order,
                name: order[i].name,
                description: order[i].description,
                unit_price: order[i].value,
                item_price: item_prices[i].item_price,
                total_price,
                quantity: order[i].quantity,
                status: status,
                date,
                fk_id_legal_client: order[i].fk_id_legal_client,
                fk_id_physical_client: physical_client_id,
                fk_id_meal: order[i].pk_id_meal
            })
        }

        return response.json({ message_success, pk_id_order });
    },

    async index(request, response) {
        const pk_id_order = request.headers.authorization;
        const fk_id_physical_client = request.headers.id_physical_client
        const status_in_progress = 'em_andamento';

        const order = await connection('tb_order')
            .where('pk_id_order', pk_id_order)
            .and
            .where('fk_id_physical_client', fk_id_physical_client)
            .and
            .where('status', status_in_progress)
            .select('*');

        return response.json(order);
    },
    async delete(request, response) {
        const { pk_id_order, id_physical_client } = request.headers;
        const status_in_progress = 'em_andamento';
        const order = await connection('tb_order')
            .where('pk_id_order', pk_id_order)
            .and
            .where('fk_id_physical_client', id_physical_client)
            .select('fk_id_physical_client')
            .first();

        if (order.fk_id_physical_client != id_physical_client) {
            return response.status(401).json({ error: 'Operation not permitted' });
        } 
        await connection('tb_order')
            .where('pk_id_order', pk_id_order)
            .and
            .where('status', status_in_progress)
            .delete();
        return response.status(204).send();
    },
    async update(request, response) {
        let orderList = request.body;
        let totalPrice = 0;
        for (let i = 0; i < orderList.length; i++) {
            orderList[i].item_price = orderList[i].unit_price * orderList[i].quantity
            totalPrice += orderList[i].item_price;
        }
        for (let index = 0; index < orderList.length; index++) {
            await connection('tb_order')
            .where('pk_id_order', orderList[index].pk_id_order)
            .and
            .where('fk_id_physical_client', orderList[index].fk_id_physical_client)
            .and
            .where('fk_id_meal', orderList[index].fk_id_meal)
            .update({ quantity: orderList[index].quantity, item_price: orderList[index].item_price, total_price: totalPrice });
        }
        return response.status(200).send();
    }
}

function calculateTotalPriceOrder(order) {

    let item_price = 0;
    let total_price = 0;

    for (let i = 0; i < order.length; i++) {
        item_price = order[i].value * order[i].quantity

        total_price = total_price + item_price;
    }
    return (total_price)
}

function calculaItemPriceOrder(order) {

    let item_price;
    let all_items_prices = [];

    for (let i = 0; i < order.length; i++) {

        item_price = 0;

        item_price = order[i].value * order[i].quantity

        all_items_prices.push({
            item_price: item_price,
        })
    };

    return all_items_prices;
}



