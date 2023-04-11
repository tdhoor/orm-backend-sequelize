import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { Address } from './entity/address.entity';
import { Customer } from './entity/customer.entity';
import { OrderItem } from './entity/order-item.entity';
import { Order } from './entity/order.entity';
import { ProductCategory } from './entity/product-category.entity';
import { Product } from './entity/product.entity';

import * as dotenv from 'dotenv';
dotenv.config();

export const DB = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        models: [
            Address, Customer, OrderItem, Order, ProductCategory, Product
        ],
        dialect: process.env.DB_TYPE as Dialect,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        logging: false,
        pool: {
            max: 5
        }
    }
);

