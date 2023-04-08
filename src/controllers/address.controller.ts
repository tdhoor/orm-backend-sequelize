import { Request, Response, NextFunction } from "express";
import { Address } from "../entity/address.entity";
import { execTest } from "@core/functions/exec-test.function";
import { IAddressController } from "@core/models/controllers/address-controller.model";

class AddressController implements IAddressController {
    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Address.create(req.body);
        })
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
        })
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
        })
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
            const [_, addresses] = await Address.update(req.body, {
                where: {
                    id: +req.body.id
                },
                returning: true
            });
            return addresses[0];
        })
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
            const id = +req.params.id;
            await Address.destroy({
                where: { id },
            });
            return id;
        })
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