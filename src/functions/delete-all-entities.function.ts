import { DB } from "../db";
import { Address } from "../entity/address.entity";
import { Customer } from "../entity/customer.entity";
import { OrderItem } from "../entity/order-item.entity";
import { Order } from "../entity/order.entity";
import { ProductCategory } from "../entity/product-category.entity";
import { Product } from "../entity/product.entity";

export async function deleteAllEntities() {
    const tableNames = [Address.tableName, Customer.tableName, Order.tableName, OrderItem.tableName, Product.tableName, ProductCategory.tableName];
    for (const tableName of tableNames) {
        await DB.query('SET FOREIGN_KEY_CHECKS = 0;');
        await DB.query('TRUNCATE table `' + tableName + '`;');
        await DB.query('SET FOREIGN_KEY_CHECKS = 1;');
    }
}