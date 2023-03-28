import { execTest } from "@core/functions/exec-test.function";
import { IProductController } from "@core/models/controllers/product-controller.model";
import { Request, Response, NextFunction } from "express";
import { countEntities } from "../functions/count-entities.function";
import { Product } from "../entity/product.entity";
import { ProductCategory } from "../entity/product-category.entity";

class ProductController implements IProductController {
    getProductsFromCategory(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Product.findAll({
                include: [
                    {
                        model: ProductCategory,
                        attributes: [],
                        required: true,
                        where: {
                            name: req.params.name
                        }
                    }
                ],
                order: [['name', 'ASC']],
                limit: 100,
                subQuery: false
            });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error getting products from category" })
                console.log(error);
            })
    }

    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Product.create(req.body);
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error creating product" })
                console.log(error);
            })
    }

    getOneById(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Product.findOne({
                where: { id: +req.params.id }
            })
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error getting product" })
                console.log(error);
            })
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return Product.findAll({
                order: [['name', 'ASC']],
                limit: 100
            });
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error creating products" })
                console.log(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const [_, products] = await Product.update(req.body, {
                where: {
                    id: +req.body.id
                },
                returning: true
            });
            return products[0];
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error updating product" })
                console.log(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const id = +req.params.id;
            await Product.destroy({
                where: {
                    id
                }
            });
            return id;
        }, countEntities)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ msg: "Error deleting product" })
                console.log(error);
            })
    }
}

export const productController = new ProductController();