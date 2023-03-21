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
                res.status(500).send(error);
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
                res.status(500).send(error);
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
                res.status(500).send(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const [affectedCount, affectedRows] = await OrderItem.update(req.body, { where: { id: +req.body.id }, returning: true });
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
            return OrderItem.destroy({ where: { id: +req.params.id } });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }
}

export const orderItemController = new OrderItemController();