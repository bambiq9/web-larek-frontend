# Проектная работа "Веб-ларек"
https://github.com/bambiq9/web-larek-frontend.git

Работа приложения строится на основе шаблона Model-View-Presenter (MVP) и использует событийно-ориентированный подход.

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- `src/` — исходные файлы проекта
- `src/components/` — папка с JS компонентами
- `src/components/base/` — папка с базовым кодом

Важные файлы:
- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/scss/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами


## Классы Model
### 1. `ProductListModel`
Отвечает за работу с товарами магазина.

#### Конструктор:
`constructor(events: IEventEmitter)`
- `events` — экземпляр `EventEmitter`.

#### Поля:
- `products: IProduct[]` — список всех доступных товаров.

#### Методы:
- `getProducts(): IProduct[]` — возвращает список товаров.
- `setProducts(products: IProduct[]): IProduct[]` — обновляет список товаров в свойстве `products`, а также вызывает событие `productList:set`.


### 2. `Api`
Отвечает за отправку запросов серверу.

#### Конструктор:
`constructor(baseUrl: string, options: RequestInit = {})`

#### Поля:
- `baseUrl: string` — адрес API.
- `options: RequestInit` — дополнительные параметры запроса.

#### Методы:
- `handleResponse(response: Response): Promise<object>` — обработка ответа сервера. Возвращает данные, либо отклоняет промис с текстом ошибки.
- `get(uri: string)` — получает данные с сервера.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` — отправляет данные на сервер.

### 3. `AppApi`
Наследует `Api`.  
Отвечает за получение данных о товарах с сервера, а также за запросы оформления заказа.

#### Конструктор:
`constructor(baseUrl: string)`

#### Поля:
- `baseUrl: string` — адрес API.

#### Методы:
- `getProducts(): Promise<IProduct[]>` — отправляет запрос на получение данных о товарах. Вызывает событие `productList:get` или `productList:error`.
- `order(data: OrderData): Promise<PostError | PostSuccess>` — принимает объект с данными заказа и отправляет запрос на сервер.


### 5. `CartModel`
Модель корзины. Отвечает за хранение, управление списком добавленных товаров и обработку их данных.

#### Конструктор:
`constructor(events: IEventEmitter)`

#### Поля:
- `products: Map<IProduct['id'], IProduct>` — Коллекция. Ключ: id товара, значение - объект товара.
- `totalPrice: number` — общая цена всех товаров в корзине.

#### Методы:
- `addProduct(product: IProduct): void` — добавляет товар в корзину. Вызывает событие `cart:add`.
- `removeProduct(id: IProduct["id"]): void` — удаляет товар из корзины. Вызывает событие `cart:remove`.
- `getProducts(): Map<IProduct['id'], IProduct>` — возвращает список товаров в корзине.
- `getAmountOfProducts(): number` — возвращает количество товаров в корзине.
- `getTotalPrice(): number` — возвращает стоимость (сумму) всех товаров в корзине.
- `clearCart(): void` — очищает корзину.


### 6. `OrderModel`
Отвечает за управление данными заказа.

#### Конструктор:
`(protected events: IEventEmitter)`

#### Поля:
- `order` — содержит объект с данными заказа.
  - `email` 
  - `phone`
  - `paymentType` — тип оплаты (card/cash).
  - `address`
- `formErrors` — список ошибок в полученных от пользователя данных.

#### Сеттеры и геттеры:
- `set payment(type: PaymentMethods)` — устаналивает тип оплаты.
- `get payment`, `address`, `email`, `phone`

#### Методы:
- `setFieldOrder<K extends keyof OrderModelTypes>(field: K, value: OrderModelTypes[K])` — обновляет данные заказа (`paymentType`, `address`) в объекте `order` и вызывает метод `validate`.
- `setFieldContacts<K extends keyof OrderModelTypes>(field: K, value: OrderModelTypes[K])` — обновляет контактные данные (`phone`, `email`) в объекте `order` и вызывает метод `validate`.
- `validateOrder(): boolean` — проверяет данные заказа на корректность.
- `validateContacts(): boolean` — проверяет контактные данные на корректность.
- `clear(): void` — возвращает объект `order` к значению по-умолчанию.


## Классы View
### 1. `View<T>`
Абстрактный класс.  
Основа для классов представления.

#### Конструктор:
`(container: HTMLElement)`
- `container` — основной контейнер отображаемого элемента.

#### Методы:
- `toggleClass(element: HTMLElement, className: string, force?: boolean)` — переключает класс.
- `setText(element: HTMLElement, value: unknown)` — меняет текстовое содержимое.
- `setDisabled(element: HTMLElement, state: boolean)` — уставаливает аттрибут disabled.
- `render(data?: Partial<T>)` — отвечает за отображение элемента. Обновляет поля текущего экземпляра класса. Возвращает `container(HTMLElement)`.


### 2.1 `ProductView` 
Наследует `View`.
Представление карточки товара в списке товаров.

Содержит следующие элементы разметки карточки товара: `container`, `titleElement`, `priceElement`, `categoryElement`, `imageElement`.

#### Конструктор:
```
(
  protected readonly container: HTMLElement,
  protected events: IEventEmitter,
  protected handler: ClickHandler
)
```
- `handler` — обработчик события `click` на `container`.

Добавляется слушатель события `click` на `container`.

#### Сеттеры и геттеры:
- `set title(text: string)` — текст элемента `titleElement`.
- `set price(value: number)` — текст `priceElement`.
- `set category(value: string)` — текст `categoryElement`. 
- `set image(src: string)` — значение атрибута `src` элемента `imageElement`.


### 2.2 `ProductViewPreview`
Наследует `ProductView`.

Представление карточки товара в модальном окне.

Содержит следующие элементы разметки карточки товара: унаследованные элементы от родителя, `description`, `button`.

#### Конструктор:
```
(
  protected readonly container: HTMLElement,
  protected events: IEventEmitter,
  protected handler: ClickHandler
)
```
- `handler` — обработчик события `click` на `button`.

#### Сеттеры и геттеры:
- `set buttonText(text: string)` — установка текста кнопки `button`.
- `set buttonDisable(value: boolean)` — установка значения аттрибута `disavbled` у кнопки `button`.


### 2.3 `ProductViewCart`
Наследует `ProductView`.

Представление карточки товара в корзине.

Содержит следующие элементы разметки карточки товара: унаследованные элементы от родителя, `button`, `indexElement`.

#### Конструктор:
```
(
  protected readonly container: HTMLElement,
  protected events: IEventEmitter,
  protected handler: ClickHandler
)
```
- `handler` — обработчик события `click` на `button`.

#### Сеттеры и геттеры:
- `set index(index: number)` — установка индекса карточки для отображения в списке товаров корзины.


### 3. `ProductListView`
Наследует `View`.

Представление списка товаров магазина.  
Обновление списка происходит через сеттер `set products(products: HTMLElement[])`.

#### Конструктор:
`(container: HTMLElement)`


### 4. `CartView`
Наследует `View`. 

Отображение корзины.

Содержит следующие элементы разметки корзины: `container`, `cartButton`, `cartCounter`, `productList`, `totalPriceElement`, `submitButton`.

#### Конструктор:
```
(
  protected readonly container: HTMLElement,
  protected events: IEventEmitter
)
```  
Добавляется обработчик события `click` на нажатие `submitButton`. Вызывает событие `form:order`.  
Добавляется обработчик события `click` на нажатие `cartButton`. Вызывает событие `cart:open`.

#### Сеттеры и геттеры:
- `set valid(value: boolean)` — устанавливает значение аттрибута `disabled` у кнопки `submitButton`.
- `set products(products: HTMLElement[])` — обновляет список товаров в `productList`.
- `set totalPrice(price: number)` — обновляет текстовое содержимое элемента `totalPriceElement`.
- `set cartCount(count: number)` — обновляет текстовое содержимое элемента `cartCounter`.


### 5.1 `Form<T>`
Наследует `View`.  
Основа для классов форм. Отвечает за отображение формы.  
Содержит следующие элементы разметки формы: `container`, `errorElement`, `submitButton`, `inputs`.  

#### Конструктор:
```
(
  protected readonly container: HTMLFormElement,
  protected events: IEventEmitter
)
```
Добавляется слушатель события `input` на поля ввода, хранящиеся в `inputs`.

#### Сеттеры и геттеры:
- `set valid(value: boolean)` — управляет состоянием аттрибута `disabled` у `submitButton`.
- `set errors(data: string)` — отображает текст ошибок при неверно заполенной форме.

#### Методы:
- `inputChangeHandler(field: keyof T, value: string)` — обработчик события `input`. Вызывает событие типа `имя_формы.поле_ввода:change`.
- `clear()` — очищает все поля ввода в `inputs`.


### 5.2 `FormOrder`
Наследует `Form`. 

Отвечает за отображение формы типа оплаты и адреса доставки.    
Содержит следующие элементы разметки формы: `deliveryAddress`, `buttonsContainer`.

#### Конструктор:
`(container: HTMLFormElement, events: IEventEmitter)`
Добавляет обработчик события `submit`. Вызывает событие `form:contacts`.  
Устанавливает обработчик события `click` на `buttonsContainer` для управления представлением кнопок переключения типа оплаты и вызова метода `paymentTypeChangeHandler`.

#### Сеттеры и геттеры:
- `set deliveryAddressValue(value: string)` — устанавливает значение в поле ввода `deliveryAddress`.

#### Методы:
- `paymentTypeChangeHandler(type: PaymentMethods)` — вызывает событие `order:paymentMethod` и передает объект со свойством `type`.


### 5.3 `FormContacts`
Наследует `Form`.  

Отвечает за отображение формы контактных данных.  
Содержит следующие элементы разметки формы: `email`, `phone`.

#### Конструктор:
`(container: HTMLFormElement, events: IEventEmitter)`

#### Сеттеры и геттеры:
- `set emailValue(value: string)` — устанавливает значение в поле ввода `email`.
- `set phoneValue(value: string)` — устанавливает значение в поле ввода `phone`.


### 6. `Modal`
Наследует `View`.  

Отвечает за открытие/закрытие и отображение модального окна.  
Содержит следующие элементы разметки модального окна: `container`, `content`, `closeButton`.
Обновление контента модального окна происходит через сеттер `set content(data: HTMLElement)` — `modalContent`.

#### Конструктор:
`(container: HTMLElement, events: IEventEmitter)`

Добавляются обработчики событий при нажатии на оверлей и кнопку закрытия модального окна.

#### Методы:
- `open()` — отображает модальное окно. Вызывает событие `modal:open`
- `close()` — скрывает модальное окно. Вызывает событие `modal:close`
- `render(data: IModalData): HTMLElement` — расширяет родительский метод `render`, добавляя функционал открытия модального окна.


### 7. `SuccessView`
Наследует `View`.

Представление успешного оформления заказа.
Содержит следующие элементы разметки: `container`, `priceElement`, `button`.

#### Конструктор:
```
(
  protected readonly container: HTMLElement,
  protected events: IEventEmitter
)
```
Добавляется обработчик события `click` на `button`. Вызывает событие `modal:close`.

#### Сеттеры и геттеры:
- `set price(value: number)` — устанавливает текстовое значение элемента `priceElement`.


## Presenter
Находится в основном скрипте приложения `index.ts`. Не выделяется в отдельный класс.
Презентер связывает между собой модель и представление, используя событийно-ориентированный подход.


### Разделение ответственности
Презентер не хранит и не отображает данные.  
Его задача реагирвать на дейтсвия пользователя, полученные из представления в виде событий и передавать в модель задачу на обновление данных. И наоборот.

### Работа с событиями
Пример работы с событиями:
```ts
events.on('событие', () => {
  // Обработка события через метод представления или модели
  class.method(); 
});
```

Для работы с событиями используется класс `EventEmitter`.
Его методы `on`, `off` и `emit` позволяют установить, снять обработчики событий, а также вызвать само событие.

### Список событий:
- `OrderSubmit` = `order:submit` — все формы заполнены и данные готовы к отправке на сервер.
- `OrderError` = `order:error` — ошибка валидации формы заказа.
- `OrderPaymentMethod` = `order:paymentMethod` — изменен способ оплаты заказа.
- `OrderValid` = `order:valid` — форма заказа корректно заполнена.
- `ContactsError` = `contacts:error` — ошибка валидации формы контактов.
- `ContactsValid` = `contacts:valid` — форма конактных данных корректно заполнена.
- `CartOpen` = `cart:open` — открыта корзина.
- `CartChanged` = `cart:changed` — изменения в составе корзины.
- `FormOrder` = `form:order` — открыта форма заказа.
- `FormContacts` = `form:contacts` — открыта форма контактных данных.
- `ModalOpen` = `modal:open` — открыто модальное окно.
- `ModalClose` = `modal:close` — закрыто модальное окно.
- `ProductListSet` = `productList:set` — получены данные товаров с сервера.
- `ProductClick` = `product:click` — нажатие на товар в списке.
- `ProductAdd` = `product:add` — товар добавлен в корзину.
- `ProductDelete` = `product:delete` — товар удален из корзины.

## Ключевые типы данных
```ts
// Данные товара приходят с сервера в следующем виде: 
type IProduct = {
  title: string; // Название товара
  image: string; // Адрес изображения для карточки
  category: Categories; // Категория
  description: string; // Описание
  price: number; // Цена
  id: string; // Идентификатор
}
```

```ts
// Тип объекта для отправки на сервер, собираемый в презентере 
// из данных форм и корзины.
type OrderData = {
	email: string;
	phone: string;
	address: string;
	payment: PaymentMethods;
	items: string[];
	total: number;
}
```

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```