import { defineStore } from 'pinia'

export const feats_state = defineStore('feats_state', () => {
    const feats = [] as Array<{Name: string}>;

    const set_feats = () =>{

    }

    const get_feats = () =>{

    }

    return {
        feats, set_feats, get_feats
    }
})
