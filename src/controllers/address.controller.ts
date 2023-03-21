import { Request, Response, NextFunction } from "express";
import { Address } from "../entity/address.entity";
import { execTest } from "@core/functions/exec-test.function";
import { countEntities } from "../functions/count-entities.function";
import { IAddressController } from "@core/models/controllers/address-controller.model";

class AddressController implements IAddressController {
    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Address.create(req.body);
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
            return Address.findOne({
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
            return Address.findAll({ limit: 100 });
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
            const [affectedCount, affectedRows] = await Address.update(req.body, { where: { id: +req.body.id }, returning: true });
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
            return Address.destroy({ where: { id: +req.params.id } });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }
}

export const addressController = new AddressController();