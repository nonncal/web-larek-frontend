# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

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




### Компонент работы с API

- src/components/MarketApi.ts