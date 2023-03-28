import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, BelongsTo, DataType, ForeignKey } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { ProductCategory, IProductCategoryCreationAttributes } from './product-category.entity';
import { IOrderItemCreationAttributes, OrderItem } from './order-item.entity';
import { IProduct } from '@core/models/entities/product.model';

export interface IProductCreationAttributes extends Optional<IProduct, "id" | "productCategory" | "productCategoryId" | "orderItems"> { }

@Table({})
export class Product extends Model<IProduct, IProductCreationAttributes> {
    @Column({ primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: new DataType.STRING(100) })
    name!: string;

    @Column({ type: new DataType.TEXT })
    description!: string;

    @Column({ type: DataType.FLOAT })
    price!: number;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @ForeignKey(() => ProductCategory)
    @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: null })
    productCategoryId!: number;

    @BelongsTo(() => ProductCategory, { onDelete: "SET NULL" })
    productCategory!: ProductCategory | IProductCategoryCreationAttributes;

    @HasMany(() => OrderItem)
    orderItems!: OrderItem[] | IOrderItemCreationAttributes[]
}