import { defineStore } from 'pinia'
export const useMenuStore = defineStore('menu', () => {

    const state = {
        logged_in: false
    };

    const mutators = {

    }

    return{
        state,
        mutators
    }
})
  