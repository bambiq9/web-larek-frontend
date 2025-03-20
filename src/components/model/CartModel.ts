import { IProduct, IEventEmitter } from "../../types";
import { IOrderState } from "../../types/api/CartApi";
import { PaymentMethods } from "../../types/view/Form";
import { ICartModel, OrderStateType } from "../../types/model/CartModel";

class CartModel implements ICartModel {
  _products: Map<string, number>;
  _events: IEventEmitter;

  constructor(_events: IEventEmitter) {
    this._events = _events;
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

class OrderState implements IOrderState {
  set email(email: string) {}
  set phone(phone: string) {}
  set address(address: string) {}
  set payment(payment: PaymentMethods) {}
  set total(total: number) {}
  set items(items: string[]){}

  getState(): OrderStateType{
    return;
  }
}