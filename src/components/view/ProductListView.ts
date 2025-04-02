import { View } from "../base/View";

class ProductListView extends View<HTMLElement[]> {
  productList: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
  }

  set products(products: HTMLElement[]) {}
}