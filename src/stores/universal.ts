import { defineStore } from 'pinia'

export const universal_store = defineStore('general_store', () => {

  const plus = '/images/plus.svg';
  const minus = '/images/minus.svg';

  return {
    plus,
    minus,
  }
})
