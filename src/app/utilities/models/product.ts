import { Category } from "../../northwind-ui/products/product-table/models/category";
import { OrderDetails } from "./order-detail";
import { Supplier } from "../../northwind-ui/products/product-table/models/supplier";

export interface ProductModel {
    categoryId: number;
    discontinued?: boolean;
    productName: string;
    quantityPerUnit?: string;
    reorderLevel?: number;
    supplierId?: number;
    unitPrice: number;
    unitsInStock?: number;
    unitsOnOrder?: number;
}