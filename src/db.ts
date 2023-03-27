import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { Address } from './entity/address.entity';
import { Customer } from './entity/customer.entity';
import { OrderItem } from './entity/order-item.entity';
import { Order } from './entity/order.entity';
import { ProductCategory } from './entity/product-category.entity';
import { Product } from './entity/product.entity';

export const DB = new Sequelize(process.env.POSTGRES_DB_NAME, process.env.POSTGRES_DB_USER, process.env.POSTGRES_DB_PASSWORD, {
    models: [Address, Customer, OrderItem, Order, ProductCategory, Product],
    dialect: process.env.POSTGRES_DB_TYPE as Dialect,
    host: process.env.POSTGRES_DB_HOST,
    port: +process.env.POSTGRES_DB_PORT,
    logging: false
});

