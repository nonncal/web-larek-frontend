import './scss/styles.scss';

import { IProductItem } from './types/components/AppData';
import { AppData } from './components/AppData';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { MarketApi } from './components/MarketApi';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement, createElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { ContactsOrder, PaymentOrder } from './components/Order';
import { Card } from './components/Card';
import { Basket } from './components/common/Basket';
import { Success } from './components/common/Success';
import { IOrderForm } from './types/components/Order';

const events = new EventEmitter();
const api = new MarketApi(CDN_URL, API_URL);

events.onAll(({eventName, data}) => {
  console.log(eventName, data);
})

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const page = new Page(document.body, events);
const appData = new AppData({}, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const paymentOrder = new PaymentOrder(cloneTemplate(orderTemplate), events);
const contactsOrder = new ContactsOrder(cloneTemplate(contactsTemplate), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);

appData.addToBasket({
  title: 'Архитекторы общества',
  price: 233,
  category: 'другое', // категория продукта 
  image: 'dsdsdsd', // ссылка на изображение 
  id: '1113', // идентификатор продукта
  description: 'ewfewfefw' 
});

events.on('items:changed', () => {
  page.catalog = appData.catalog.map((item) => {
    const card = new Card(cloneTemplate(cardCatalogTemplate), {onClick: () => events.emit('card:select', item)});
    // card.id = item.id;
    // card.title = item.title;
    // card.price = item.price === null ? 'Бесценно' : `${item.price} синапсов`;
    // card.image = item.image;
    // card.category = item.category;
    return card.render(item);
  });

  page.counter = appData.getBasketProducts();
})

events.on('card:select', (item: IProductItem) => {
  appData.setPreview(item);
});

events.on('preview:changed', (item: IProductItem) => { // @todo onClick
  const card = new Card(cloneTemplate(cardPreviewTemplate));
  modal.render({content: card.render(item)});
})

events.on('basket:open', () => {
  modal.render({
   content:  basket.render()
  }) 
});

// events.on('order:submit', () => {
//   api.orderProducts(appData.order)
//   .then((res) => {
//     const success = new Success(cloneTemplate(successTemplate), {
//       onClick: () => {
//         modal.close();
//         appData.clearBasket();
//       }
//     })
//     modal.render({
//         content: success.render()
//     })
//   })
//   .catch(err => {
//     console.error(err);
//   })
// })

events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
    const { email, phone, payment,  address} = errors;
    paymentOrder.valid = !payment && !address;
    paymentOrder.errors = Object.values({payment, address}).filter(i => !!i).join('; ');
    contactsOrder.valid = !email && !phone;
    contactsOrder.errors = Object.values({email, phone}).filter(i => !!i).join('; ');
});

events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    appData.setOrderField(data.field, data.value);
});

// events.on('order:open', () => {
//   modal.render({
//         content: paymentOrder.render({
//             phone: '',
//             email: '',
//             valid: false,
//             errors: ''
//         })
//     });
// });

events.on('modal:open', () => {
  page.locked = true;
});

events.on('modal:close', () => {
  page.locked = false;
});

api.getProductsList()
    .then(appData.setCatalog.bind(appData))
    .catch(err => {
        console.error(err);
    });