import { defineStore } from 'pinia'

export const types_state = defineStore('types_state', () => {
    const type_list = [
        'Knife', 'Sword', 'Fist', 'Spear',
        'Hammer', 'Pistol', 'Assault Rifle',
        'Enery Pistol', 'Throwing Knives', 'Crossbow',
        'Jetski', 'Sniper Rifle', 'Stealth', 'Spear',
        'Traps', 'Crafting', 'Throwing', 'Grenades',
        'Shotgun', 'Thought Control', 'Metathermics',
        'Psychokinesis', 'Temporal Manipulation'
    ] as Array<string>

    const chosen_list = [] as Array<string>

    const remove_from_chosen = (index: number): boolean => {
        const initial_len = chosen_list.length;
        chosen_list.splice(index, 1);
        const final_len = chosen_list.length;
        if(initial_len >= final_len){
            return true;
        }
        return false;
    }

    const add_to_chosen = (selection: string): boolean => {
        const initial_len = chosen_list.length;
        chosen_list.push(selection);
        const final_len = chosen_list.length;
        if(initial_len < final_len){
            return true;
        }
        return false;
    }

    const get_list = () => type_list

    const get_chosen = () => chosen_list

    return {
        type_list, chosen_list, get_list, get_chosen, add_to_chosen, remove_from_chosen
    }
})

