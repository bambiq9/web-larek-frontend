import { IProduct } from "..";
import { View } from "../../components/view/View";

export interface IProductView extends View<IProduct> {
  title: HTMLElement;
  price: HTMLElement;
  category?: HTMLElement;
  image?: HTMLElement;
  description?: HTMLElement;
  deleteButton?: HTMLButtonElement;
}