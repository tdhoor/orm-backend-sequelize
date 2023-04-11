import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, HasOne } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Address, IAddressCreationAttributes } from './address.entity';
import { Order, IOrderCreationAttributes } from "./order.entity"
import { ICustomer } from '@core/models/entities/customer.model';

export interface ICustomerCreationAttributes extends Optional<ICustomer, "id" | "address" | "addressId" | "orders"> { }

@Table({
})
export class Customer extends Model<ICustomer, ICustomerCreationAttributes> {
    @Column({ primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: new DataType.STRING(500) })
    email!: string;

    @Column({ type: new DataType.STRING(50) })
    phone!: string;

    @Column({ type: new DataType.STRING(500) })
    password!: string;

    @Column({ type: new DataType.STRING(50) })
    firstName!: string;

    @Column({ type: new DataType.STRING(50) })
    lastName!: string;

    @CreatedAt
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    createdAt?: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    updatedAt?: Date;

    @HasOne(() => Address)
    address!: Address | IAddressCreationAttributes

    @HasMany(() => Order)
    orders!: Order[] | IOrderCreationAttributes[]
}