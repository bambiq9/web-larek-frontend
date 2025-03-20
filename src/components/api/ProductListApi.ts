import { IProduct } from "../../types";
import { Api } from "../base/api";
import { IProductListApi } from "../../types/api/ProductListApi";

class ProductListApi extends Api implements IProductListApi {
  baseUrl: string;

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  getProducts(): Promise<IProduct[]> {
    return;
  }

  getProduct(id: IProduct["id"]): Promise<IProduct> {
    return;
  }
}