import { defineStore } from 'pinia'

export const feats_state = defineStore('feats_state', () => {
    let feats = [] as Array<{Feat: string, Desc: string}> || null;

    const set_feats = (data: Array<{Feat: string, Desc: string}> | null): boolean =>{
        if(data !== null) {
            for(let i = 0; i < data.length; i++){
                const feat = data[i]
                feats.push(feat);
            }   
            return true         
        }
        return false
    }

    const get_feats = (): Array<{Feat: string, Desc: string}> | null => {
        return feats;
    }

    const reset_feat_list = (): boolean => {
        const cleared_list: Array<{Feat: string, Desc: string}> = new Array();
        feats = cleared_list;
        if(feats!== null && feats.length === 0){
            return true;
        }
        return false;
    }

    return {
        feats, set_feats, get_feats, reset_feat_list
    }
})
