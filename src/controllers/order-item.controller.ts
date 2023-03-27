import { execTest } from "@core/functions/exec-test.function";
import { Request, Response, NextFunction } from "express";
import { countEntities } from "../functions/count-entities.function";
import { IOrderItemController } from "@core/models/controllers/order-item-controller.model";
import { OrderItem } from "../entity/order-item.entity";

class OrderItemController implements IOrderItemController {
    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return OrderItem.create(req.body);
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error creating order item" })
                console.log(error);
            })
    }

    getOneById(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return OrderItem.findOne({
                where: { id: +req.params.id },
            })
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error getting order item" })
                console.log(error);
            })
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return OrderItem.findAll({ limit: 100 });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error getting order items" })
                console.log(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const orderItem = await OrderItem.findByPk(+req.body.id);
            orderItem.update(req.body);
            return orderItem;
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error updating order item" })
                console.log(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const orderItem = await OrderItem.findByPk(+req.params.id);
            orderItem.destroy();
            return orderItem;
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error deleting order item" })
                console.log(error);
            })
    }
}

export const orderItemController = new OrderItemController();