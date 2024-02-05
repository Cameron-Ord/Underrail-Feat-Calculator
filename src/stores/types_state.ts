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

    const get_list = () => type_list

    const get_chosen = () => chosen_list

    return {
        type_list, chosen_list, get_list, get_chosen
    }
})

