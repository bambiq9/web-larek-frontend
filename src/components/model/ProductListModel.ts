import { IProduct, IEventEmitter } from "../../types";
import { IProductListModel } from "../../types/model/ProductListModel";

class ProductListModel implements IProductListModel{
  _products: IProduct[];
  _events: IEventEmitter;

  constructor(events: IEventEmitter) {
    this._events = events;
  }

  getProducts(): IProduct[] {
    return;
  }

  getProduct(id: IProduct["id"]): IProduct {
    return;
  }

  setProducts(products: IProduct[]): IProduct[] {
    return;
  }
}