import './scss/styles.scss';

import { AppData } from './components/AppData';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';

const events = new EventEmitter();

const app = new AppData({}, events);

app.setCatalog([
  {
  title: 'Архитекторы общества',
  price: 233,
  category: 'другое', // категория продукта 
  image: 'dsdsdsd', // ссылка на изображение 
  id: '1111', // идентификатор продукта
  description: 'ewfewfefw' // описание 
},{
  title: 'Архитекторы общества',
  price: 233,
  category: 'другое', // категория продукта 
  image: 'dsdsdsd', // ссылка на изображение 
  id: '1112', // идентификатор продукта
  description: 'ewfewfefw' // описание 
},{
  title: 'Архитекторы общества',
  price: 233,
  category: 'другое', // категория продукта 
  image: 'dsdsdsd', // ссылка на изображение 
  id: '1113', // идентификатор продукта
  description: 'ewfewfefw' // описание 
}

])

app.addToBasket({
  title: 'Архитекторы общества',
  price: 233,
  category: 'другое', // категория продукта 
  image: 'dsdsdsd', // ссылка на изображение 
  id: '1111', // идентификатор продукта
  description: 'ewfewfefw' // описание 
});

app.addToBasket({
  title: 'Архитекторы общества',
  price: 233,
  category: 'другое', // категория продукта 
  image: 'dsdsdsd', // ссылка на изображение 
  id: '1112', // идентификатор продукта
  description: 'ewfewfefw' // описание 
});

app.addToBasket({
  title: 'Архитекторы общества',
  price: 233,
  category: 'другое', // категория продукта 
  image: 'dsdsdsd', // ссылка на изображение 
  id: '1113', // идентификатор продукта
  description: 'ewfewfefw' // описание 
});

console.log(app.basket);

app.deleteFromBasket({
  title: 'Архитекторы общества',
  price: 233,
  category: 'другое', // категория продукта 
  image: 'dsdsdsd', // ссылка на изображение 
  id: '1111', // идентификатор продукта
  description: 'ewfewfefw' // описание 
});

console.log(app.basket);

console.log(app.getTotal());

app.clearBasket();

console.log(app.basket);

const page = new Page(document.body, events);

page.counter = 23;