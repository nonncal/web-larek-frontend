import './scss/styles.scss';

import { AppData } from './components/AppData';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { MarketApi } from './components/MarketApi';
import { API_URL, CDN_URL } from './utils/constants';

const events = new EventEmitter();
const app = new AppData({}, events);
const api = new MarketApi(CDN_URL, API_URL);



