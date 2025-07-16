# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/common/ - папка с компонентами представления не использующими бизнес-логику

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
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
## Базовый код

### Компонент для работы с DOM элементами

- src/components/base/Component.ts

Абстрактный класс `Component` предоставлет инструменты для работы с DOM элементами.
Будет принимать в параметр полиморфного типа необходимый интерфейс.

### Компонент базовой модели

- src/components/base/Model.ts

Абстрактный класс `Model` добавляет общие функции всем наследующим моделям.
Будет принимать в параметр полиморфного типа необходимый интерфейс.

### Базовый комнонент работы с API

- src/components/base/api.ts

Класс `Api` реализует работу с API через классы. 

### Брокер событий 

- src/components/base/events.ts

Класс `EventEmitter` предоставляет возможность работать с событиями.
Позволяет озвучить событие и подписаться на него.

### Компонент работы с API

- src/components/MarketApi.ts

```
interface IMarketApi {
  getProductsList(): Promise<IProductItem[]>; // метод получения списка товаров 
  getProduct(id: string): Promise<IProductItem>; // метод получения отдельного товара
  orderProducts(order: IOrderForm): Promise<IOrderResult>; // метод для отправки заказа на сервер
}
```

Класс `MarketAPI` наследуется от базового класса `Api`, имплементирует интерфейс `IMarketApi`.
Позволяет получить спискок товаров `getProductsList`, получить отдельный товар `getProduct` , совершить заказ `orderProducts`.

## Описание данных
### Ключевые типы данных

```
type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'; // категории продукта

// интерфейс отдельного продукта
interface IProductItem {
  title: string; // название
  price: number; // цена 
  category: Category; // категория продукта 
  image: string; // ссылка на изображение 
  id: string; // идентификатор продукта
  description?: string; // описание 
}

type BasketItem = Pick<IProductItem, 'id' | 'title' | 'price'>; // айтем в корзине, понадобится только название, цена и айди

// интерфейс формы заказа
interface IOrderForm {
  payment: 'cash' | 'card'; // тип выбора оплаты
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
  preview: boolean; // показывается ли модальное окно
}

type FormError = Partial<Record<keyof IOrderForm, string>> // для валидации ошибок формы, берем поля из заказа

```
### Единый компонент модели данных, содержит состояние приложения и продукта. 

- src/components/AppData.ts

1. Класс `ProductItem` 

Содержит информацию отдельного продукта и управляет его состоянием. 
Метод `isAvailable` проверяет доступен ли продукт для покупки, `addToBasket` позволяет добавить продукт в корзину, а `deleteFromBasket` удалить из корзины.

2. Класс `AppState` 

Содержит информацию о состоянии приложения. 
Позволяет установить и получить информацию о каталоге продуктов `setCatalog` и `getCatalog`, очистить корзину `clearBasket`, 
получить итоговую сумму в корзине `getTotal`, валидирует форму заказа `validateOrder` и `setOrderField`, устанавливает превью setPreview,
фильтрует корзину с товарами `toggleOrderedProducts`. 


## Компоненты представления 
### Компонент `Basket.ts`

- src/components/common/Basket.ts 

```
interface IBasketView {
  items: HTMLElement[]; // товары в корзине 
  total: number; // итоговая сумма
}
```

1. Класс `Basket` 

Выводит в контейнер товары и итоговую стоимость заказа. 

### Компонент `Foem.ts`

- src/components/common/Form.ts 

```
interface IFormState {
  valid: boolean; // валидна ли форма
  errors: string[]; // массив ошибок валидации формы
}
```

1. Класс `Form` 

Проводит валидацию формы, добавляет на нее слушатели, выводит ошибки, переопределяет метод `render` родительского классса `Component`.

### Компонент `Modal.ts`

- src/components/common/Modal.ts 

```
interface IModalData {
  content: HTMLElement; // контент который будет выведен в модалку
}
```

1. Класс `Modal`

Отвечает за закрытие и открытие модального окна, устанавливает в него контент.

### Компонент `Success.ts`

- src/components/common/Success.ts 

```
interface ISuccess {
  total: number; // сумма заказа
}

interface ISuccessActions {
  onClick: () => void; // действия с окном успеха
}
```

1. Класс `Success` 

Отвечает за обработку действий с окном успеха.

### Компонент `Order.ts`

- src/components/Order.ts 

1. Класс `Order`

Наследуется от класса `Form` с параметром полиморфного типа `IOrderForm` и отвечает за установку полей формы заказа.

### Компонент `Page.ts`

- src/components/Page.ts 

```
interface IPage {
  counter: number; // количество товаров в корзине
  catalog: HTMLElement[]; // список товаров на странице
  locked: boolean; // блокировка страницы при открытии модального окна
}
```

1. Класс `Page`

Наследуюется от базового классса `Component` с параметром полиморфного типа `IPage` и 
отвечает за вывод каталога, счетчика и блокировку страницы.

### Компонент `Card.ts`

- src/components/Card.ts 

```
interface ICard {
  description?: string; // описание карточки
  image?: string; // картинка карточки
  price: number; // цена товара
  title: string; // название товара
  category?: string; // категория товара
}

interface ICardActions {
  onClick: (event: MouseEvent) => void; // действия с карточкой
}
```

1. Класс `Card`

Отвечает за установку всех свойств карточки, далее будет использоваться как родитель для разных видов карточки товара.

2. Класс `BasketItem` 

Отвечавет за карточку в корзине.

3. Класс `CatalogItem` 

Отвечает за карточку в каталоге.

4. Класс `PreviewItem` 

Отвечает за превью карточки при её выборе.




