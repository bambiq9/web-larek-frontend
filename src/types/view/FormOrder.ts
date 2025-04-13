export type FormOrderData = {
	address: string;
	payment: PaymentMethods;
};

export enum PaymentMethods {
	card = 'card',
	cash = 'cash',
}

export interface IFormOrder {
	paymentType: string;
	deliveryAddress: string;
}
