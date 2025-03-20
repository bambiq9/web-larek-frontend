import { View } from "./View";

class CartView extends View<Map<string, number>> {
  _container: HTMLElement;
  _totalPriceElement: HTMLElement;
  _submitButton: HTMLButtonElement;

  constructor(cartTemplate: HTMLTemplateElement) {
    super(cartTemplate);

    this._container = cartTemplate;
  }

  set totalPrice(price: number) {
  }

  render(data: Map<string, number>) {}
}