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
- `getProduct(id: IProduct["id"]): IProduct` — возвращает товар по его id.
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

### 2. `ProductListApi`
Наследует `Api`.  
Отвечает за получение данных о товарах с сервера.

#### Конструктор:
`constructor(baseUrl: string)`

#### Поля:
- `baseUrl: string` — адрес API.

#### Методы:
- `getProducts(): Promise<IProduct[]>` — отправляет запрос на получение данных о товарах. Вызывает событие `productList:get` или `productList:error`.
- `getProduct(id: IProduct["id"]): Promise<IProduct>` — получает данные об одном товаре.


### 3. `CartModel`
Модель корзины. Отвечает за хранение, управление списком добавленных товаров и обработку их данных.

#### Конструктор:
`constructor(events: IEventEmitter)`

#### Поля:
- `products: Map<string, number>` — Коллекция id товаров в корзине и их количество.

#### Методы:
- `addProduct(id: IProduct["id"]): IProduct` — добавляет товар в корзину. Вызывает событие `cart:add`.
- `removeProduct(id: IProduct["id"]): IProduct` — удаляет товар из корзины. Вызывает событие `cart:remove`.
- `getProducts(): Map<string, number>` — возвращает список товаров в корзине.
- `getTotalPrice(): number` — возвращает стоимость (сумму) всех товаров в корзине.
- `clearCart(): void` — очищает корзину.


### 4. `FormModel<T>`
Основа моделей форм.  
Принимает дженерик, определяющий структуру данных формы.

#### Конструктор:
`constructor(events: IEventEmitter)`

#### Методы:
- `setField(field: keyof T, value: string)` — обновляет данные формы и вызывает метод `validate`.
- `abstract validate(): boolean` — абстрактный метод валидации формы. Проверяет правильность заполенния формы и генерирует объект ошибок. Будет реализовываться в каждом наследующем классе по-разному.
- `abstract getData(): unknown` — абстрактный метод. Возвращает данные формы для последующего использования.


### 4.1 `FormOrderModel`
Наследует `FormModel<IFormOrder>`.
Отвечает за состояние формы order и ее валидацию.

#### Конструктор:
`constructor(events: IEventEmitter)`

#### Поля:
- `paymentType: PaymentMethods` — тип оплаты заказа.
- `deliveryAddress: string` — адрес доставки заказа.

#### Сеттеры и геттеры:
- `set payment(type: string)` — `paymentType`
- `get payment(): string` — `paymentType`
- `get address(): string` — `deliveryAddress`

#### Методы:
- `validate(): boolean` — метод `validate` реализован с учетом типа введенных данных доставки. 
- `getData(): FormOrderData` — вощвращает объект с данными формы.


### 4.2 `FormContactsModel`
Наследует `FormModel<IFormContacts>`.
Отвечает за состояние формы contacts и ее валидацию.

#### Конструктор:
`constructor(events: IEventEmitter)`

#### Поля:
- `email: string` — значение поля формы email.
- `phone: string` — значение поля формы phone.

#### Сеттеры и геттеры:
- `get emailAddress(): string` — `email`
- `get phoneNumber(): string` — `phone`

#### Методы:
- `validate(): boolean` — метод `validate` реализован с учетом типа введенных контактных данных. 
- `getData(): FormContactsData` — вощвращает объект с данными формы.


5. `OrderApi`
Наследует `Api`.  
Отвечает за отправку запроса оформления заказа.

#### Конструктор:
`constructor(baseUrl: string)`

#### Поля:
- `baseUrl: string` — адрес API.

#### Методы:
- `order(data: OrderApiData): Promise<PostError | PostSuccess>` — принимает объект с данными заказа и отправляет запрос на сервер.


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

### 2. `ProductView` 
Наследует `View`.  

Содержит следующие элементы разметки карточки товара: `container`, `title`, `price`, `category`, `image`, `description`, `addButton`, `deleteButton`.

#### Конструктор:
`(container: HTMLElement, events: IEventEmitter)`  
Добавляются обрабочтки нажатия на кнопки `addButton` и `deleteButton`:  
- `addButton` — событие `product:add`.  
- `deleteButton` — событие `product:delete`.  
При нажатии на карточку, вызывается событие `product:click`.

### 3. `ProductListView`
Наследует `View`.

Представление списка товаров магазина.  
Содержит элемент списка товаров `productList`.  
Обновление списка происходит через сеттер `set products(products: HTMLElement[])`.

#### Конструктор:
`(container: HTMLElement)`

### 4. `CartView`
Наследует `View`. 

Отображение корзины.

Содержит следующие элементы разметки корзины: `container`, `productList`, `totalPriceElement`, `submitButton`.  
Обновление элементов происходит через сеттеры: 
- `set products` — `productList`
- `set totalPrice` — `totalPriceElement`

#### Конструктор:
`(container: HTMLElement)`  
Добавляется обработчик события `submit` на нажатие `submitButton`, который вызывает событие `order:submit`.

### 5.1 `Form<T>`
Наследует `View`.  
Основа для классов форм. Отвечает за отображение формы.  
Содержит следующие элементы разметки формы: `container`, `errorElement`, `submitButton`.  

#### Сеттеры и геттеры:
- `set valid(value: boolean)` — управляет состоянием аттрибута `disabled` у `submitButton` 
- `set errors(data: string)` — отображает текст ошибок при неверно заполенной форме

#### Методы:
- `inputChangeHandler(field: keyof T, value: string)` — обработчик события `input`. Вызывает событие типа `имя_формы.поле_ввода:change`

### 5.2 `FormOrder`
Наследует `Form`. 

Отвечает за отображение формы типа оплаты и адреса доставки.    
Содержит следующие элементы разметки формы: `buttonCard`, `buttonCash`, `deliveryAddress`.

#### Сеттеры и геттеры:
- `set deliveryAddressValue(value: string)` — устанавливает значение в поле ввода `deliveryAddress`.

### 5.3 `FormContacts`
Наследует `Form`.  

Отвечает за отображение формы контактных данных.  
Содержит следующие элементы разметки формы: `email`, `phone`.

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

## Presenter
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
- `OrderCreate = 'order:submit'` — форма заказа успешно заполнена
- `OrderSucess = 'order:success'` — получен успешный ответ на заказ с сервера
- `OrderError = 'order:error'` — сервер вернул ошибку
- `CartAdd = 'cart:add'` — добавлен товар в корзину
- `CartRemove = 'cart:remove'` — товар удален из корзины
- `CartPaymentMethod = 'cart:paymentMethod'` — изменен метод оплаты заказа
- `ModalOpen = 'modal:open'` — открытие модального окна
- `ModalClose = 'modal:close'` — закрытие модального окна
- `FormValidation = 'form:validation'` — валидация формы
- `ProductListGetSuccess = 'productList:get'` — успешно получен список товаров с API
- `ProductListGetError = 'productList:error'` — запрос списка товаров вернул ошибку
- `ProductListSet = 'productList:set'` — обновлен список товаров в модели
- `ProductClick = 'product:click'` — нажатие на товар в списке
- `ProductAdd = 'product:add'` — нажатие на кнопку "В корзину"
- `ProductDelete = 'product:delete'` — нажатие на кнопку удаления товара в корзине

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
type OrderApiData = { 
  email: string;
  phone: string;
  address: string;
  payment: PaymentMethods;
  items: string[];
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