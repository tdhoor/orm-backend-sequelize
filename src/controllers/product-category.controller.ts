import { execTest } from "@core/functions/exec-test.function";
import { Request, Response, NextFunction } from "express";
import { IProductCategoryController } from "@core/models/controllers/product-category-controller.model";
import { ProductCategory } from "../entity/product-category.entity";

export class ProductCategoryController implements IProductCategoryController {
    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return ProductCategory.create(req.body);
        })
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
        })
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
        })
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
            const [_, productCategories] = await ProductCategory.update(req.body, {
                where: {
                    id: +req.body.id
                },
                returning: true
            });
            return productCategories[0];
        })
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
            const id = +req.params.id;
            await ProductCategory.destroy({
                where: { id }
            });
            return id;
        })
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