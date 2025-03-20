type Categories = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export type IProduct = {
  title: string;
  image: string;
  category: Categories;
  description: string;
  price: number;
  id: string;
}

export interface IEventEmitter {
  emit<T extends object>(event: string, data?: T): void;
};

export enum Events {
  OrderCreate = 'order:create',
  OrderSucess = 'order:success',
  OrderError = 'order:error',
  CartAdd = 'cart:add',
  CartRemove = 'cart:remove',
  CartPaymentMethod = 'cart:paymentMethod',
  ModalOpen = 'modal:open',
  ModalClose = 'modal:close',
  ProductListGetSuccess = 'productList:get',
  ProductListGetError = 'productList:error',
  ProductListSet = 'productList:set',
  ProductClick = 'product:click'
}