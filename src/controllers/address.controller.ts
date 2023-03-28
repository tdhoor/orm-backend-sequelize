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
                res.status(500).json({ msg: "Error creating address" })
                console.log(error);
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
                res.status(500).json({ msg: "Error getting address" })
                console.log(error);
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
                res.status(500).json({ msg: "Error creating addresses" })
                console.log(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            await Address.update(req.body, { where: { id: +req.body.id } });
            return await Address.findByPk(+req.body.id);
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error updating address" })
                console.log(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const address = await Address.findByPk(+req.params.id);
            await address.destroy();
            return address;
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error deleting address" })
                console.log(error);
            })
    }
}

export const addressController = new AddressController();