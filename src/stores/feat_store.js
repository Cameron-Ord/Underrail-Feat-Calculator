import { defineStore } from 'pinia'
export const useFeatStore = defineStore('feat', () => {

    const state = {
        feats_list: undefined,
        svg_list: undefined,
        feats_are_loaded: false,
        svgs_are_loaded: false,
        can_save_build: false,
    };

    const getters = {

        return_can_save(){
            return state.can_save_build;
        }
    }

    return{
        state,
        getters
    }
})
  