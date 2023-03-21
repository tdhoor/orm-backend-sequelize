import { DB } from "../db";
import { Address } from "../entity/address.entity";
import { Customer } from "../entity/customer.entity";
import { OrderItem } from "../entity/order-item.entity";
import { Order } from "../entity/order.entity";
import { ProductCategory } from "../entity/product-category.entity";
import { Product } from "../entity/product.entity";

export async function deleteAllEntities() {
    const tableNames = [Address.tableName, Customer.tableName, Order.tableName, OrderItem.tableName, Product.tableName, ProductCategory.tableName].join(`","`);
    await DB.query(`TRUNCATE "${tableNames}" RESTART IDENTITY CASCADE;`);
}