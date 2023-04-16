import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, BelongsTo, DataType, ForeignKey, Default } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { ProductCategory, IProductCategoryCreationAttributes } from './product-category.entity';
import { IOrderItemCreationAttributes, OrderItem } from './order-item.entity';
import { IProduct } from '@core/models/entities/product.model';

export interface IProductCreationAttributes extends Optional<IProduct, "id" | "productCategory" | "productCategoryId" | "orderItems"> { }

@Table({})
export class Product extends Model<IProduct, IProductCreationAttributes> {
    @Column({ primaryKey: true, autoIncrement: true, allowNull: true })
    id!: number;

    @Column({ type: new DataType.STRING(100), allowNull: false })
    name!: string;

    @Column({ type: new DataType.TEXT, allowNull: false })
    description!: string;

    @Column({ type: DataType.FLOAT, allowNull: false })
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