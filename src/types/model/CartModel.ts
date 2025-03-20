import { IProduct } from "..";
import { PaymentMethods } from "../view/Form";

export type OrderStateType = {
  email: string;
  phone: string;
  address: string;
  payment: PaymentMethods;
  total: number,
  items: string[],
}

export interface IOrderState {
  email: string;
  phone: string;
  address: string;
  payment: PaymentMethods;
  total: number,
  items: string[],

  getState(): OrderStateType;
}

export interface ICartModel {
  _products: Map<string, number>;

  addProduct(id: IProduct["id"]): IProduct;
  removeProduct(id: IProduct["id"]): IProduct;
  getProducts(): Map<string, number>;
  getTotalPrice(): number;
  clearCart(): void;
}