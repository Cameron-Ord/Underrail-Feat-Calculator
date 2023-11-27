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
    return{
        state,
    }
})
  