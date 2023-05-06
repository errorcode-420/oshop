import { CartItem } from "./cart-item";

export interface ShoppingCart {
    [x: string]: any;
    id?: string;
    creationDate: any;
    items: CartItem[];
}