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
                res.status(500).send(error);
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
                res.status(500).send(error);
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
                res.status(500).send(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const [affectedCount, affectedRows] = await Order.update(req.body, { where: { id: +req.body.id }, returning: true });
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
            return Order.destroy({ where: { id: +req.params.id } });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }
}

export const orderController = new OrderController();