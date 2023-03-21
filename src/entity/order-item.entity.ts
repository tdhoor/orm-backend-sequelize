import { Table, Column, Model, BelongsTo, DataType, ForeignKey } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { IOrderCreationAttributes, Order } from './order.entity';
import { IProductCreationAttributes, Product } from './product.entity';
import { IOrderItem } from '@core/models/entities/order-item.model';

export interface IOrderItemCreationAttributes extends Optional<IOrderItem, "id" | "product" | "productId" | "order" | "orderId"> { }

@Table({
    timestamps: false
})
export class OrderItem extends Model<IOrderItem, IOrderItemCreationAttributes> {
    @Column({ primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.INTEGER })
    quantity!: number;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, allowNull: true })
    orderId!: number;

    @BelongsTo(() => Order, {
        onDelete: "CASCADE"
    })
    order!: Order | IOrderCreationAttributes;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: true })
    productId!: number;

    @BelongsTo(() => Product, {
        onDelete: "CASCADE"
    })
    product!: Product | IProductCreationAttributes;
}