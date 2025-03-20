import { Api } from "../base/api";
import { ICartApi, IOrderState, PostSuccess, PostError } from "../../types/api/CartApi";

class CartApi extends Api implements ICartApi {
  _baseUrl: string;

  constructor(baseUrl: string) {
    super(baseUrl);

    this._baseUrl = baseUrl;
  }

  order(data: IOrderState): Promise<PostSuccess | PostError> {
    return;
  }
}