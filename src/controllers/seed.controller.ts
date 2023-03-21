import { createMock } from "@core/functions/create-entity-mock.function";
import { Address } from "../entity/address.entity";
import { Customer } from "../entity/customer.entity";
import { OrderItem } from "../entity/order-item.entity";
import { Order } from "../entity/order.entity";
import { ProductCategory } from "../entity/product-category.entity";
import { Product } from "../entity/product.entity";
import { deleteAllEntities } from "../functions/delete-all-entities.function";
import { countEntities } from "src/functions/count-entities.function";

async function seedDb(req, res, next) {
    try {
        const amount: number = +req.params.amount;
        let p1 = performance.now();

        await deleteAllEntities();
        console.log("DB cleared");

        let customers = createMock.customers(amount);
        let addresses = createMock.addresses(amount);
        let categories = createMock.productCategories((amount / 1000) < 100 ? 100 : (amount / 1000));
        let products = createMock.products(amount, categories);
        let { orders, orderItems } = createMock.orders(amount, 0, products, false);

        console.log(JSON.stringify({ orderItems, orders }, null, 2))

        await Customer.bulkCreate(customers);
        console.log("customers created");
        customers = null;

        await Address.bulkCreate(addresses);
        console.log("addresses created");
        addresses = null;

        await ProductCategory.bulkCreate(categories);
        console.log("categories created");
        categories = null;

        await Product.bulkCreate(products);
        console.log("products created");
        products = null;

        await Order.bulkCreate(orders);
        console.log("orders created");
        orders = null;

        await OrderItem.bulkCreate(orderItems);
        console.log("orderItems created");
        orderItems = null;

        console.log(performance.now() - p1);
        const count = await countEntities();
        console.log('====================================');
        res.status(200).json({ message: "DB seeded", count });
        console.log('====================================');
    } catch (error) {
        res.status(500).json({ message: "Error seeding DB", error });
    }
}

export default {
    seedDb
}