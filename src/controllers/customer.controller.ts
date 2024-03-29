import { execTest } from "@core/functions/exec-test.function";
import { Request, Response, NextFunction } from "express";
import { Customer } from "../entity/customer.entity";
import { countEntities } from "../functions/count-entities.function";
import { ICustomerController } from "@core/models/controllers/customer-controller.model";
import { Order } from "../entity/order.entity";
import { Product } from "../entity/product.entity";
import { OrderItem } from "../entity/order-item.entity";
import { Address } from "../entity/address.entity";

class CustomerController implements ICustomerController {
    createMany(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Customer.bulkCreate(req.body);
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error creating customers" })
                console.log(error);
            })
    }

    getCustomerOrders(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Order.findAll({
                where: {
                    customerId: +req.params.id
                },
                order: [['createdAt', 'DESC']],
                include: [OrderItem],
                limit: 100
            })
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error getting customer orders" })
                console.log(error);
            })
    }

    getCustomerProducts(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Product.findAll({
                include: [
                    {
                        model: OrderItem,
                        required: true,
                        attributes: [],
                        include: [
                            {
                                model: Order,
                                attributes: [],
                                required: true,
                                include: [
                                    {
                                        model: Customer,
                                        attributes: [],
                                        where: {
                                            id: +req.params.id
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                order: [['name', 'ASC']],
                limit: 100,
                subQuery: false
            })
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error getting customer products" })
                console.log(error);
            })
    }

    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Customer.create(req.body, {
                include: [Address]
            });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error creating customer" })
                console.log(error);
            })
    }

    getOneById(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Customer.findOne({
                where: {
                    id: +req.params.id
                },
                include: [Address]
            });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error getting customer" })
                console.log(error);
            })
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Customer.findAll({
                include: [Address],
                limit: 100
            });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error getting customers" })
                console.log(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const customer = await Customer.findByPk(+req.body.id, { include: [Address] });
            customer.update(req.body);
            return customer;
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error updating customer" })
                console.log(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const customer = await Customer.findByPk(+req.params.id, { include: [Address] });
            customer.destroy();
            return customer;
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error deleting customer" })
                console.log(error);
            })
    }
}

export const customerController = new CustomerController();