import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Product, IProductCreationAttributes } from './product.entity';
import { IProductCategory } from '@core/models/entities/product-category.model';

export interface IProductCategoryCreationAttributes extends Optional<IProductCategory, "id" | "products"> { }

@Table({
    timestamps: false
})
export class ProductCategory extends Model<IProductCategory, IProductCategoryCreationAttributes> {
    @Column({ primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: new DataType.STRING(100) })
    name!: string;

    @HasMany(() => Product)
    products!: Product[] | IProductCreationAttributes[]
}