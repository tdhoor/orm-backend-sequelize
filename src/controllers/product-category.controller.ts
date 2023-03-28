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
                res.status(500).json({ msg: "Error creating product category" })
                console.log(error);
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
                res.status(500).json({ msg: "Error getting product category" })
                console.log(error);
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
                res.status(500).json({ msg: "Error getting product categorys" })
                console.log(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            await ProductCategory.update(req.body, { where: { id: +req.body.id } });
            return await ProductCategory.findByPk(+req.body.id);
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error updating product category" })
                console.log(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const productCategory = await ProductCategory.findByPk(+req.params.id);
            productCategory.destroy();
            return productCategory;
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error deleting product category" })
                console.log(error);
            })
    }
}

export const productCategoryController = new ProductCategoryController();