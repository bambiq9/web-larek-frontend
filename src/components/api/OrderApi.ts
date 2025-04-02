import { Api } from "../base/api";
import { IOrderApi, PostError, PostSuccess } from "../../types/api/OrderApi";
import { OrderApiData } from "../../types";

class OrderApi extends Api implements IOrderApi {
  baseUrl: string;

  constructor(baseUrl: string) {
    super(baseUrl);

    this.baseUrl = baseUrl;
  }

  order(data: OrderApiData): Promise<PostError | PostSuccess> {
    return;
  }
} 