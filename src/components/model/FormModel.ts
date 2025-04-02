import { FormOrderData, IEventEmitter, IFormContacts, IFormOrder } from "../../types";
import { PaymentMethods } from "../../types/view/Form";

abstract class FormModel<T> {
  constructor(events: IEventEmitter) {};

  setField(field: keyof T, value: string): void {
  }

  abstract validate(): boolean;
  
  abstract getData(): unknown;

  clear(): void {};
}

class FormOrderModel extends FormModel<IFormOrder> {
  paymentType: PaymentMethods;
  deliveryAddress: string;

  constructor(events: IEventEmitter) {
    super(events);
  } 

  set payment(type: string) {};

  get payment(): string {
    return this.paymentType;
  };

  get address(): string {
    return this.deliveryAddress;
  }

  validate(): boolean {
    return;
  }

  getData(): FormOrderData {
    return;
  }
}

class FormContactsModel extends FormModel<IFormContacts> {
  email: string;
  phone: string;

  constructor(events: IEventEmitter) {
    super(events);
  }

  get emailAddress(): string {
    return this.email;
  }

  get phoneNumber(): string {
    return this.phone;
  }

  validate(): boolean {
    return;
  }

  getData(): FormContactsModel {
    return;
  }
}