import { defineStore } from 'pinia'
export const useFeatStore = defineStore('feat', () => {

    const state = {
        feats_list: undefined,
        svg_list: undefined,
        feats_are_loaded: false,
        svgs_are_loaded: false
    };

    return{
        state,
       
    }
})
  