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
                res.status(500).send(error);
            })
    }

    getCustomerOrders(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Order.findAll({
                where: {
                    customerId: +req.params.id
                },
                order: [['createdAt', 'DESC']],
                limit: 100
            })
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
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
                res.status(500).send(error);
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
                res.status(500).send(error);
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
                res.status(500).send(error);
            })
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Customer.findAll({
                limit: 100
            });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            console.log(req.body);
            const [affectedCount, affectedRows] = await Customer.update(req.body, {
                where: {
                    id: +req.body.id
                },
                returning: true
            });
            return affectedRows[0];
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Customer.destroy({
                where: {
                    id: +req.params.id
                }
            });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }
}

export const customerController = new CustomerController();