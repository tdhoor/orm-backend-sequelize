import { Table, Column, Model, BelongsTo, ForeignKey, HasMany, CreatedAt, UpdatedAt, DataType, HasOne, AllowNull, Default } from 'sequelize-typescript';
import { Optional, Sequelize } from 'sequelize';
import { Address, IAddressCreationAttributes } from './address.entity';
import { Order, IOrderCreationAttributes } from "./order.entity"
import { ICustomer } from '@core/models/entities/customer.model';

export interface ICustomerCreationAttributes extends Optional<ICustomer, "id" | "address" | "addressId" | "orders"> { }

@Table({
    timestamps: true
})
export class Customer extends Model<ICustomer, ICustomerCreationAttributes> {
    @Column({ primaryKey: true, autoIncrement: true, allowNull: true })
    id!: number;

    @Column({ type: new DataType.STRING(500), allowNull: false })
    email!: string;

    @Column({ type: new DataType.STRING(50), allowNull: false })
    phone!: string;

    @Column({ type: new DataType.STRING(500), allowNull: false })
    password!: string;

    @Column({ type: new DataType.STRING(50), allowNull: false })
    firstName!: string;

    @Column({ type: new DataType.STRING(50), allowNull: false })
    lastName!: string;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @HasOne(() => Address)
    address!: Address | IAddressCreationAttributes

    @HasMany(() => Order)
    orders!: Order[] | IOrderCreationAttributes[]
}