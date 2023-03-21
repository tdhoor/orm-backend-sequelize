import { Address } from "../entity/address.entity";
import { Customer } from "../entity/customer.entity";
import { OrderItem } from "../entity/order-item.entity";
import { Order } from "../entity/order.entity";
import { ProductCategory } from "../entity/product-category.entity";
import { Product } from "../entity/product.entity";

export async function countEntities() {
    return {
        address: await Address.count(),
        customer: await Customer.count(),
        order: await Order.count(),
        orderItem: await OrderItem.count(),
        product: await Product.count(),
        productCategory: await ProductCategory.count(),
    }
}