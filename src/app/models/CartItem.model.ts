import { Product } from './Product.model';

export interface CartItem {
    item: Product;
    count: number;
}
