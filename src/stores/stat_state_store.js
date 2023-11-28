import { defineStore } from 'pinia'
export const useStatStore = defineStore('stat', () => {

    const state = {
        stat_count_limiter: null,
        stat_items_array: null,
        stats_list :[
            'Strength',
            'Dexterity',
            'Agility',
            'Constitution',
            'Perception',
            'Will',
            'Intelligence'
        ]
    };

    const actions = {
        
        set_default_values(){
            const stat_limiter = 35;
            const stat_items = [];
            for(let i = 0; i < state.stats_list.length; i++){
                const stat = state.stats_list[i];
                stat_items.push({
                    statName: stat,
                    statValue: 5
                });
            }

            return [stat_limiter, stat_items];
        }
    }


    return{
        state,
        actions
    }
})
  