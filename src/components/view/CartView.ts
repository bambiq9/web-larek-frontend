import { View } from "../base/View";

type ICartView = {
  products: HTMLElement[];
  totalPrice: number;
}

class CartView extends View<ICartView> {
  container: HTMLElement;
  productList: HTMLElement;
  totalPriceElement: HTMLElement;
  submitButton: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);
  }

  set products(products: HTMLElement[]) {
  }

  set totalPrice(price: number) {
  }
}