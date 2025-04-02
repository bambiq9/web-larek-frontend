import { IProduct } from "..";

export interface ICartModel {
  products: Map<string, number>;

  addProduct(id: IProduct["id"]): IProduct;
  removeProduct(id: IProduct["id"]): IProduct;
  getProducts(): Map<string, number>;
  getTotalPrice(): number;
  clearCart(): void;
}