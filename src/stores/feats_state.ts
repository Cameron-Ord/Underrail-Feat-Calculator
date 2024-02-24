import { defineStore } from 'pinia'

export const feats_state = defineStore('feats_state', () => {
  let feats = [] as Array<{ Feat: string, Desc: string }> || null;
  let chosen_feats = [] as Array<{ Feat: string, Desc: string }>
  const set_feats = (data: Array<{ Feat: string, Desc: string }> | null): boolean => {
    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        const feat = data[i]
        feats.push(feat);
      }
      return true
    }
    return false
  }

  const check_if_chosen = (feat_name: string): { found: boolean, index: number } => {
    for (let i = 0; i < chosen_feats.length; i++) {
      const chosen_feat: string = chosen_feats[i]['Feat'];
      if (chosen_feat === feat_name) {
        return { found: true, index: i };
      }
    }
    return { found: false, index: -1 };
  }

  const get_feats = (): Array<{ Feat: string, Desc: string }> | null => {
    return feats;
  }

  const reset_feat_list = (): boolean => {
    const cleared_list: Array<{ Feat: string, Desc: string }> = new Array();
    feats = cleared_list;
    if (feats !== null && feats.length === 0) {
      return true;
    }
    return false;
  }


  const remove_from_chosen = (index: number) => {
    chosen_feats.splice(index, 1);
  }

  const add_to_chosen = (feat_name: string) => {
    for (let i = 0; i < feats.length; i++) {
      if (feat_name === feats[i]['Feat']) {
        chosen_feats.push(feats[i]);
      }
    }
  }

  const get_chosen_feats = (): Array<{ Feat: string, Desc: string }> => {
    return chosen_feats;
  }

  return {
    feats, add_to_chosen, remove_from_chosen, set_feats, get_feats, reset_feat_list, get_chosen_feats, check_if_chosen
  }
})
