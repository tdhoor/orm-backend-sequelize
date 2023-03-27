import { execTest } from "@core/functions/exec-test.function";
import { Request, Response, NextFunction } from "express";
import { countEntities } from "../functions/count-entities.function";
import { IOrderController } from "@core/models/controllers/order-controller.model";
import { Order } from "../entity/order.entity";
import { OrderItem } from "../entity/order-item.entity";

class OrderController implements IOrderController {
    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Order.create(req.body, { include: [OrderItem] });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error creating order" })
                console.log(error);
            })
    }

    getOneById(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Order.findOne({
                where: { id: +req.params.id },
                include: [OrderItem]
            })
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error getting order" })
                console.log(error);
            })
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Order.findAll({
                include: [OrderItem],
                order: [['createdAt', 'DESC']],
                limit: 100
            });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error getting orders" })
                console.log(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const order = await Order.findByPk(+req.body.id, { include: [OrderItem] });
            order.update(req.body);
            return order;
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error updating order" })
                console.log(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const order = await Order.findByPk(+req.params.id, { include: [OrderItem] });
            order.destroy();
            return order;
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error deleting order" })
                console.log(error);
            })
    }
}

export const orderController = new OrderController();