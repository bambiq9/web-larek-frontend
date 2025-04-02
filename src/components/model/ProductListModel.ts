import { IProduct, IEventEmitter } from "../../types";
import { IProductListModel } from "../../types/model/ProductListModel";

class ProductListModel implements IProductListModel{
  products: IProduct[];

  constructor(events: IEventEmitter) {
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