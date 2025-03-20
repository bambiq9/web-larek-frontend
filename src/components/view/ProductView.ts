import { IProduct } from "../../types";
import { IProductView } from "../../types/view/IProductView";

class ProductView implements IProductView {
  _container: HTMLElement;
  title: HTMLElement;
  price: HTMLElement;
  category: HTMLElement;
  image: HTMLElement;
  description: HTMLElement;

  _addButton: HTMLButtonElement | null;
  _deleteButton: HTMLButtonElement | null;

  constructor(container: HTMLElement) {
    this._container = container;
  }

  render(data: Partial<IProduct>): HTMLElement {
    return;
  }
}