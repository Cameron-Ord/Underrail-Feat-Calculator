import { defineStore } from 'pinia'

export const feats_state = defineStore('feats_state', () => {
    const feats = [] as Array<{Feat: string, Desc: string}>;

    const set_feats = (data: any ) =>{
        for(let i = 0; i < data.length; i++){
            const feat = data[i]
            feats.push(feat);
        }
    }

    const get_feats = () =>{

    }

    return {
        feats, set_feats, get_feats
    }
})
