import { IEventEmitter, IProduct } from "../../types";
import { View } from "../base/View";

class ProductView extends View<IProduct> {
  container: HTMLElement;
  title: HTMLElement;
  price: HTMLElement;
  category: HTMLElement;
  image: HTMLElement;
  description: HTMLElement;

  addButton: HTMLButtonElement | null;
  deleteButton: HTMLButtonElement | null;

  constructor(container: HTMLElement, events: IEventEmitter) {
    super(container);
  }
}