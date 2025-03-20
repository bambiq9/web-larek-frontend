import { IProduct } from "..";

export interface IProductListModel {
  _products: IProduct[];

  getProducts(): IProduct[];
  getProduct(id: IProduct["id"]): IProduct;
  setProducts(products: IProduct[]): IProduct[];
}