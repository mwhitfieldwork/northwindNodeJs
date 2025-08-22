import { Product} from '../../northwind-ui/products/product-table/models/products';

export interface ProductListResponse {
    success: boolean;
    data: Product[];
  }
  
  export interface ProductResponse {
    success: boolean;
    data: Product;
  }
  