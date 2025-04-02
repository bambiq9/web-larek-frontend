import { OrderApiData } from "..";

export type PostSuccess = {
  id: string;
  total: number;
}

export type PostError = {
  error: string;
}

export interface IOrderApi {
  order(data: OrderApiData): Promise<PostSuccess|PostError>;
}
