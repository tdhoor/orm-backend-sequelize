import { createMock } from "@core/functions/create-entity-mock.function";
import { Address } from "../entity/address.entity";
import { Customer } from "../entity/customer.entity";
import { OrderItem } from "../entity/order-item.entity";
import { Order } from "../entity/order.entity";
import { ProductCategory } from "../entity/product-category.entity";
import { Product } from "../entity/product.entity";
import { deleteAllEntities } from "../functions/delete-all-entities.function";
import { countEntities } from "../functions/count-entities.function";
import { calcProductCategoryAmount } from "@core/functions/calc-product-category-amount.function";
import { insert } from "../functions/insert.function";

async function seedDb(req, res, next) {
    try {
        const amount: number = +req.params.amount;
        await deleteAllEntities();

        let customers = createMock.customers(amount);
        let addresses = createMock.addresses(amount, customers);
        const createdAt = new Date();
        const updatedAt = createdAt;
        while (customers.length) {
            await insert(Customer.tableName, customers.splice(0, 10000).map(c => ({ ...c, createdAt, updatedAt })));
        }
        while (addresses.length) {
            await insert(Address.tableName, addresses.splice(0, 10000));
        }

        let categories = createMock.productCategories(calcProductCategoryAmount(amount));
        let products = createMock.products(amount, categories);
        let customerIds = Array.from({ length: amount }).map((_, i) => i + 1);
        let { orders, orderItems } = createMock.orders(amount, customerIds, products, { addOrderIdToOrderItem: true, seperateOrderItems: true });

        while (categories.length) {
            await insert(ProductCategory.tableName, categories.splice(0, 10000));
        }
        while (products.length) {
            await insert(Product.tableName, products.splice(0, 10000).map(c => ({ ...c, createdAt, updatedAt })));
        }
        while (orders.length) {
            await insert(Order.tableName, orders.splice(0, 10000).map(c => ({ ...c, createdAt, updatedAt })));
        }
        while (orderItems.length) {
            await insert(OrderItem.tableName, orderItems.splice(0, 10000));
        }
        const count = await countEntities();
        res.status(200).json({ message: "DB seeded", count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error seeding DB", error });
    }
}

async function resetDb(req, res, next) {
    try {
        await deleteAllEntities();
        res.status(200).json({ message: "DB reset" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error resetting DB" });
    }
}

export default {
    seedDb,
    resetDb
}