# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/common/ - папка с компонентами представления не использующими бизнес-логику

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/components — папка с типами разбитыми на компоненты
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

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

## Описание проекта
Проект "Оно тебе надо" представляет из себя маркетплейс для программистов, в котором можно приобрести
товары для облегчения работы. Проект реализован на TypeScript и представляет собой SPA с использованием API для
полуечения данных о товарах.

## Архитектура проекта MVP

Реализована единая модель данных приложения в файле src/components/AppData.ts, 
содержащая всю логику работы с данными и возможные действия над ними. Все изменения данных происходят через методы модели,
а она в свою очередь уведомляет об изменениях через брокер событий. 

При обработке событий производится обновление данных.

## Базовый код

### Компонент для работы с DOM элементами

- src/components/base/Component.ts

Абстрактный класс `Component` предоставлет инструменты для работы с DOM элементами.

В конструкторе принимает контейнер `container: HTMLElement`.

### Базовый комнонент работы с API

- src/components/base/api.ts

Класс `Api` реализует работу с API через классы.

В конструкторе принимает базовый URL `baseUrl: string` и настройки `options: RequestInit = {}`.

### Брокер событий 

- src/components/base/events.ts

Класс `EventEmitter` предоставляет возможность работать с событиями.
Позволяет озвучить событие и подписаться на него.

### Компонент работы с API

- src/components/MarketApi.ts

```
interface IMarketApi {
  getProductsList(): Promise<IProductItem[]>; // метод получения списка товаров 
  orderProducts(order: IOrderForm): Promise<IOrderResult>; // метод для отправки заказа на сервер
}
```

Класс `MarketAPI` наследуется от базового класса `Api`, имплементирует интерфейс `IMarketApi`.
Позволяет получить спискок товаров `getProductsList`, совершить заказ `orderProducts`.

В конструкторе принимает базовый путь, путь до ассетов и настройки, если они есть `cdn:string, baseUrl:string, options?:RequestInit`.

## Описание данных
### Ключевые типы данных

```
type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'; // категории продукта

// интерфейс отдельного продукта
interface IProductItem {
  title: string; // название
  price: number | null; // цена 
  category: Category; // категория продукта 
  image: string; // ссылка на изображение 
  id: string; // идентификатор продукта
  description: string; // описание 
}

type BasketItem = Pick<IProductItem, 'id' | 'title' | 'price'>; // айтем в корзине, понадобится только название, цена и айди

// интерфейс формы заказа
interface IOrderForm {
  payment: 'string'; // тип выбора оплаты
  phone: string; // телефон
  address: string; // адрес
  email: string; // почта
}

// интерфейс всего заказа
interface IOrder extends IOrderForm {
  items: string[]; // список товаров, будем сохранять только id
}

// интерфейс ответа сервера на заказ
interface IOrderResult {
  id: string; // айди
  total: number; // стоимость покупки
}

// интерфейс состояния приложения
interface IAppState {
  catalog: IProductItem[]; // список товаров
  order: IOrder | null; // заказ или есть или нету
  preview: string | null; // модальное окно по id карточки
}

type FormError = Partial<Record<keyof IOrderForm, string>> // для валидации ошибок формы, берем поля из заказа

```
### Единый компонент модели данных, содержит состояние приложения и продукта. 

- src/components/AppData.ts

1. Класс `AppState` имплементирует интерфейс `IAppState`, реализует единую модель данных приложения, отвечает за хранение данных и работу с ними. 

Содержит информацию о состоянии приложения. 
```
basket: string[]; // список id товаров 
order: IOrder; // даные заказа
catalog: IProductItem[]; // список товаров на главной странице
preview: string | null; // модальное окно по id карточки
formErrors: FormError = {}; // объект с ошибками валидации
```

Конструктор принимает `data: IAppState` и объект событий `events: IEvents`.

Позволяет установить и получить информацию о каталоге продуктов `setCatalog, принимает список продуктов` и `getCatalog, возвращает список товаров`, очистить корзину `clearBasket`, 
получить итоговую сумму в корзине `getTotal, возвращает число `, валидирует форму заказа `validateOrder` и `setOrderField, принимает ключ из IOrderForm и устанавливает значение`,
устанавливает превью `setPreview, принимает еденичный товар`,
фильтрует каталог с товарами `getAvailableProducts, возращает массив с доступными для покупки товарами`, `addToBasket, принимает еденичный товар` позволяет добавить продукт в корзину,
а `deleteFromBasket, принимает еденичный товар` удалить из корзины.


## Компоненты представления 
### Компонент `Basket.ts`

- src/components/common/Basket.ts 

1. Класс `Basket` наследуется от базового класса `Component`

Имеет поля:
```
    protected _list: HTMLElement; // список товаров
    protected _total: HTMLElement; // итоговая сумма заказа
    protected _button: HTMLButtonElement; // кнопка заказа
```
В конструкторе принимает контейнер и объект брокера событий `container: HTMLElement,protected events: EventEmitter`

Позволяет сеттерами установить список товаров, индекс и итог.

`set items(items: HTMLElement)`
`set total(value:number)`

Выводит в контейнер товары и итоговую стоимость заказа. 

### Компонент `Form.ts` 

- src/components/common/Form.ts 

1. Класс `Form` наследуется от базового класса `Component`

Имеет поля:
```
    protected _button: HTMLButtonElement; // кнопка подтверждения 
    protected _errors: HTMLElement; // элемент для вывода ошибок 
```

В конструкторе принимает контейнер и объект брокера событий `protected container: HTMLFormElement,protected events: EventEmitter`

Добавляет на форму слушатели, выводит ошибки, переопределяет метод `render` родительского классса `Component`.
Защищенный метод `onInputChange, принимает ключи и устанавливает значения` вызывает событие с названием поля при вводе в форму. 
Сеттерами устанвливает и снимает валидацию.

`set valid(value: boolean)`
`set errors(value: string)`

### Компонент `Modal.ts` 

- src/components/common/Modal.ts 

1. Класс `Modal` наследуется от базового класса `Component`

Имеет поля:
```
    protected _content: HTMLElement; // контент в модальном окне
    protected _button: HTMLButtonElement; // кнопка закрытия
```

В конструкторе принимает контейнер и объект брокера событий `container: HTMLElement,protected events: EventEmitter`

Отвечает за закрытие и открытие модального окна `open` и `close`, устанавливает в него контент.

`set content(value: HTMLElement)`

### Компонент `Success.ts`

- src/components/common/Success.ts 

1. Класс `Success` наследуется от базового класса `Component`

Имеет поля:
```
    protected _button: HTMLButtonElement; // кнопка действия
```

В конструкторе принимает контейнер и функцию с действиями по клику.

Отвечает за обработку действий с окном успеха.

### Компонент `Order.ts`

- src/components/Order.ts 

1. Класс `paymentOrder` наследуется от класса `Form`

В конструкторе принимает контейнер и объект брокера событий `container: HTMLElement, events: EventEmitter`

Наследуется от класса `Form` с параметром полиморфного типа `IOrderForm` и отвечает за установку полей формы заказа с адресом и выбором оплаты.

`set payment(value: 'cash' | 'card')`
`set address(value: string)`

2. Класс `contactsOrder` наследуется от класса `Form`

В конструкторе принимает контейнер и объект брокера событий `container: HTMLElement, events: EventEmitter`

Наследуется от класса `Form` с параметром полиморфного типа `IOrderForm` и отвечает за установку полей формы заказа с контактами.

`set phone(value: string)`
`set email(value: string)`

### Компонент `Page.ts`

- src/components/Page.ts 

1. Класс `Page` наследуется от базового класса `Component`

Имеет поля:
```
    protected _counter: HTMLElement; // счетчик товаров в корзине 
    protected _basket: HTMLElement; // корзина 
    protected _catalog: HTMLElement; // каталог товаров 
    protected _wrapper: HTMLElement; // обертка страницы для блокировки при открытом модальном окне
```

В конструкторе принимает контейнер и объект брокера событий `container: HTMLElement,protected events: EventEmitter`

Наследуюется от базового классса `Component` с параметром полиморфного типа `IPage` и 
отвечает за вывод каталога, счетчика и блокировку страницы.

`set counter(value: number)`
`set catalog(value: HTMLElement[])`
`set locked(value: boolean)`

### Компонент `Card.ts`

- src/components/Card.ts 

Наследуется от базового класса `Component`

Имеет поля:
```
    protected _title: HTMLElement; // название товара 
    protected _image?: HTMLElement; // картинка товара 
    protected _description?: HTMLElement; // описание товара 
    protected _button?: HTMLElement; // кнопка на карточке товара 
    protected _category?: HTMLElement; // категория товара 
    protected _price: HTMLElement; // цена товара 
```

В конструкторе принимает контейнер, защищенное свойство названия блока, в котором будет отображаться карточка и
функция с действиями по клику.

`set id(value: string)`
`get id(): string`
`set description(value: string)`
`set title(value: string)`
`get title(): string`
`set image(value: string)`
`set category(value: string)`
`set price(value: number)`
`get price()`

Отвечает за установку всех свойств карточки, далее будет использоваться как родитель для разных видов карточки товара.

1. Класс `BasketItem` наследуется от класса `Card`

В конструкторе принимает контейнер и функция с действиями по клику.

Отвечавет за отображение карточки в корзине.

2. Класс `CatalogItem` наследуется от класса `Card`

В конструкторе принимает контейнер и функция с действиями по клику.

Отвечает за отображение карточки в каталоге.

3. Класс `PreviewItem` наследуется от класса `Card`

В конструкторе принимает контейнер и функция с действиями по клику.

Отвечает за превью карточки при её выборе.


## Описание событий 

В работе будет использоваться брокер событий, в отдельный компонент работа с обработчиком событий выноситься не будет.

### Изменения в модели данных

1. `items:changed` вызывается при загрузке карточек с сервера 
2. `formErrors:change` вызывается при изменении ошибок валидации
3. `order:ready` вызывается при валидной форме заказа
4. `basket:changed` вызывается при добавлении/удалении товара из корзины

### Изменения в модели представления 

1. `basket:open` вызывается при клике на корзину
2. `order:open` вызывается при переходе на страницу оформления заказа
3. `order:submit` вызывается при отправке заказа 
4. `modal:open` и `modal:close` вызываются при открытии и закрытии модальных окон
5. `card:select` выбрана карточка товара 
6. `preview:changed` вызывается при изменении выбора карточки

