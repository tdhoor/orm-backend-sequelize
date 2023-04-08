import { execTest } from "@core/functions/exec-test.function";
import { Request, Response, NextFunction } from "express";
import { IOrderController } from "@core/models/controllers/order-controller.model";
import { Order } from "../entity/order.entity";
import { OrderItem } from "../entity/order-item.entity";

class OrderController implements IOrderController {
    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Order.create(req.body, { include: [OrderItem] });
        })
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
        })
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
        })
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
            const [_, orderItems] = await Order.update(req.body, {
                where: {
                    id: +req.body.id
                },
                returning: true
            });
            return orderItems[0];
        })
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
            const id = +req.params.id;
            await Order.destroy({
                where: { id }
            });
            return id;
        })
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