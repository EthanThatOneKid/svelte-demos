import { persistable } from './index';

export const demo = persistable('demo', { hello: 'world', favoriteNumber: 0 });
