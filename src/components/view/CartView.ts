import { Events, IEventEmitter } from '../../types';
import { ICartView } from '../../types/view/CartView';
import { ensureElement } from '../../utils/utils';
import { View } from '../base/View';

export class CartView extends View<ICartView> {
	protected cartButton: HTMLButtonElement;
	protected cartCounter: HTMLElement;
	protected productList: HTMLElement;
	protected totalPriceElement: HTMLElement;
	protected submitButton: HTMLButtonElement;

	constructor(
		protected readonly container: HTMLElement,
		protected events: IEventEmitter
	) {
		super(container);

		this.cartButton = ensureElement('.header__basket') as HTMLButtonElement;
		this.cartCounter = ensureElement('.header__basket-counter');
		this.productList = ensureElement('.basket__list', this.container);
		this.totalPriceElement = ensureElement('.basket__price', this.container);
		this.submitButton = ensureElement(
			'.basket__button',
			this.container
		) as HTMLButtonElement;

		this.valid = false;

		this.cartButton.addEventListener('click', () => {
			events.emit(Events.CartOpen);
		});

		this.submitButton.addEventListener('click', () => {
			events.emit(Events.FormOrder);
		});
	}

	set valid(value: boolean) {
		this.setDisabled(this.submitButton, !value);
	}

	set products(products: HTMLElement[]) {
		this.productList.replaceChildren(...products);
	}

	set totalPrice(price: number) {
		this.setText(this.totalPriceElement, price);
	}

	set cartCount(count: number) {
		this.setText(this.cartCounter, count);
	}
}
