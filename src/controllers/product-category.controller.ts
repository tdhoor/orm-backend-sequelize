import { execTest } from "@core/functions/exec-test.function";
import { Request, Response, NextFunction } from "express";
import { countEntities } from "../functions/count-entities.function";
import { IProductCategoryController } from "@core/models/controllers/product-category-controller.model";
import { ProductCategory } from "../entity/product-category.entity";

export class ProductCategoryController implements IProductCategoryController {
    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return ProductCategory.create(req.body);
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
            return ProductCategory.findOne({
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
            return ProductCategory.findAll({ limit: 100 });
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
            const [affectedCount, affectedRows] = await ProductCategory.update(req.body, { where: { id: +req.body.id }, returning: true });
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
            return ProductCategory.destroy({ where: { id: +req.params.id } });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }
}

export const productCategoryController = new ProductCategoryController();