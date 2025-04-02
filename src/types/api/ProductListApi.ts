import { IProduct } from "..";

export interface IProductListApi {
  baseUrl: string;

  getProducts(): Promise<IProduct[]>;
  getProduct(id: IProduct["id"]): Promise<IProduct>;
}