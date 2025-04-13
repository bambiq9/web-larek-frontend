import { View } from '../base/View';

export class ProductListView extends View<HTMLElement[]> {
	constructor(protected readonly container: HTMLElement) {
		super(container);
	}

	set products(products: HTMLElement[]) {
		this.container.replaceChildren(...products);
	}
}
