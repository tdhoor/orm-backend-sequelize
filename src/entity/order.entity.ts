import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, BelongsTo, DataType, ForeignKey } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Customer, ICustomerCreationAttributes } from './customer.entity';
import { OrderItem, IOrderItemCreationAttributes } from './order-item.entity';
import { IOrder } from '@core/models/entities/order.model';

export interface IOrderCreationAttributes extends Optional<IOrder, "id" | "customer" | "customerId" | "orderItems"> { }

@Table({
})
export class Order extends Model<IOrder, IOrderCreationAttributes> {
    @Column({ primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.FLOAT })
    totalPrice!: number;

    @CreatedAt
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    createdAt?: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    updatedAt?: Date;

    @ForeignKey(() => Customer)
    @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: null })
    customerId!: number;

    @BelongsTo(() => Customer, { onDelete: 'SET NULL' })
    customer!: Customer | ICustomerCreationAttributes;

    @HasMany(() => OrderItem)
    orderItems!: OrderItem[] | IOrderItemCreationAttributes[]
}