import { Article } from './blogUtils';
import { CATEGORY_1_ARTICLES } from '../data/category1';
import { CATEGORY_2_ARTICLES } from '../data/category2';
import { CATEGORY_3_ARTICLES } from '../data/category3';
import { CATEGORY_4_ARTICLES } from '../data/category4';

export const ARTICLES_DATA: Article[] = [
  ...CATEGORY_1_ARTICLES,
  ...CATEGORY_2_ARTICLES,
  ...CATEGORY_3_ARTICLES,
  ...CATEGORY_4_ARTICLES,
];

export const CATEGORIES = [
  { id: 'all', label: 'Home Feed', count: 20 },
  { id: 'pc-console', label: 'PC & Console', count: 5 },
  { id: 'mobile-emulation', label: 'Mobile & Emulation', count: 5 },
  { id: 'esports-tactics', label: 'Esports & Tactics', count: 5 },
  { id: 'hardware-setup', label: 'Hardware & Setups', count: 5 },
];

export const TRENDING_TICKER_ITEMS = [
  { text: 'Fix Game Lag on PC', id: 'art-05' },
  { text: 'Best Mouse Sensitivity for Gaming', id: 'art-13' },
  { text: 'Best Android Emulator for PC', id: 'art-09' },
  { text: 'Connect PS5 Controller to PC', id: 'art-03' },
  { text: 'Best Gaming PC Build for Beginners', id: 'art-01' },
  { text: 'Mechanical vs Membrane Keyboard', id: 'art-17' },
  { text: 'Dual Monitor Setup Guide for Gaming', id: 'art-19' },
  { text: 'How to Keep Gaming PC Cool', id: 'art-20' },
  { text: 'How to Boost FPS in Mobile Games', id: 'art-08' },
  { text: 'How to Improve Aim in FPS Games', id: 'art-11' },
  { text: 'Best Graphics Settings for FPS Games', id: 'art-04' },
  { text: 'How to Choose Gaming Monitor', id: 'art-16' },
  { text: 'How to Choose the Best Gaming Headset', id: 'art-18' },
  { text: 'How to Become a Pro Gamer', id: 'art-15' },
];
