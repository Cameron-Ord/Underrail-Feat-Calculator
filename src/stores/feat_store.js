import { defineStore } from 'pinia'
export const useFeatStore = defineStore('feat', () => {

    const state = {
        feats_list: undefined,
        svg_list: undefined,
        feats_are_loaded: false,
        svgs_are_loaded: false,
        can_save_build: false,
    };

    const mutators = {
        update_can_save_build(bool){
            let canSaveBuild = bool;
            return canSaveBuild
        }
    }

    return{
        state,
        mutators
    }
})
  