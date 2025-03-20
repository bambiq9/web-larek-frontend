import { IOrderState } from "./CartModel";

export type PostSuccess = {
  id: string;
  total: number;
}

export type PostError = {
  error: string;
}

export interface ICartApi {
  order(data: IOrderState): Promise<PostSuccess | PostError>;
}

export { IOrderState };
