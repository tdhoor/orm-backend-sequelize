import { Optional } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer, ICustomerCreationAttributes } from './customer.entity';
import { IAddress } from '@core/models/entities/address.model';

export interface IAddressCreationAttributes extends Optional<IAddress, "id" | "customer"> { }

@Table({
    timestamps: false
})
export class Address extends Model<IAddress, IAddressCreationAttributes> {
    @Column({ primaryKey: true, autoIncrement: true, allowNull: true })
    id!: number;

    @Column({ type: DataType.STRING(100), allowNull: false })
    street!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    city!: string;

    @Column({ type: DataType.STRING(20), allowNull: false })
    zipCode!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    country!: string;

    @ForeignKey(() => Customer)
    @Column({ type: DataType.INTEGER, allowNull: false })
    customerId!: number;

    @BelongsTo(() => Customer, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    customer!: ICustomerCreationAttributes
}