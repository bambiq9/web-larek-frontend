import { Events, IEventEmitter } from '../../types';
import { IFormOrder, PaymentMethods } from '../../types/view/FormOrder';
import { ensureElement } from '../../utils/utils';
import { Form } from './Form';

function isPaymentType(str: string): str is PaymentMethods {
	return str === PaymentMethods.cash || str === PaymentMethods.card;
}

export class FormOrder extends Form<IFormOrder> {
	deliveryAddress: HTMLInputElement;
	buttonsContainer: HTMLElement;

	constructor(container: HTMLFormElement, events: IEventEmitter) {
		super(container, events);

		this.buttonsContainer = ensureElement('.order__buttons', this.container);
		this.deliveryAddress = ensureElement(
			'.form__input',
			this.container
		) as HTMLInputElement;

		this.container.addEventListener('submit', (e) => {
			e.preventDefault();
			events.emit(Events.FormContacts);
		});

		this.paymentTypeChangeHandler(PaymentMethods.card);
		this.buttonsContainer
			.querySelector('[name="card"]')
			.classList.add('button_alt-active');

		this.buttonsContainer.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('button_alt')) {
				const button = target as HTMLButtonElement;
				const type = isPaymentType(button.name) ? button.name : undefined;
				this.paymentTypeChangeHandler(type);
				this.buttonsContainer
					.querySelectorAll('.button_alt')
					.forEach((button) => button.classList.remove('button_alt-active'));
				target.classList.add('button_alt-active');
			}
		});
	}

	set deliveryAddressValue(value: string) {
		this.deliveryAddress.value = value;
	}

	paymentTypeChangeHandler(type: PaymentMethods) {
		if (type) {
			this.events.emit(Events.OrderPaymentMethod, { type });
		}
	}

	inputChangeHandler(field: keyof IFormOrder, value: string) {
		this.events.emit(`order.${String(field)}:change`, {
			field,
			value,
		});
	}
}
