import { IProduct, IEventEmitter } from "../../types";
import { ICartModel } from "../../types/model/CartModel";

class CartModel implements ICartModel {
  products: Map<string, number>;

  constructor(events: IEventEmitter) {
  }
  
  addProduct(id: IProduct["id"]): IProduct {
    return;
  }

  removeProduct(id: IProduct["id"]): IProduct {
    return;
  }

  getProducts(): Map<string, number> {
    return;
  }

  getTotalPrice(): number {
    return;
  }

  clearCart(): void {
  }
}