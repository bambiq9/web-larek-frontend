import { View } from "./View";

class ProductListView extends View<HTMLElement[]> {
  _productListContainer: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this._productListContainer = container;
  }

  render(data: HTMLElement[]) {};
}