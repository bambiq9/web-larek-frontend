export interface IModal {
  open(): void;
  close(): void;
}

export enum ModalViews {
  cardCatalog = 'card-catalog',
  cardPreview = 'card-preview',
  cardBasket = 'card-basket',
  basket = 'basket',
  order = 'order',
  contacts = 'contacts',
  sucess = 'success',
};