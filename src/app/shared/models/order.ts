import { Address } from "./address";
import { CartItem } from "./cart-item";

export interface Order {
    id: string;
    uid: string;
    items: CartItem[],
    itemsCount: number;
    date: any
    address: Address,
    prices: any,
    reference: string
}