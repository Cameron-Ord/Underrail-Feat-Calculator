import { defineStore } from 'pinia'
export const useSkillStore = defineStore('skill', () => {

    const state = {
        skill_count_limiter: null,
        skill_items_array: null,
        skills_list: [
            'Guns',
            'Throwing',
            'Crossbows',
            'Melee',
            'Dodge',
            'Evasion',
            'Stealth',
            'Hacking',
            'Lockpicking',
            'Pickpocketing',
            'Traps',
            'Mechanics',
            'Temporal Manipulation',
            'Persuasion',
            'Intimidation',
            'Mercantile',
            'Metathermics',
            'Psychokinesis',
            'Thought Control',
            'Tailoring',
            'Biology',
            'Chemistry',
            'Electronics'
          ]
    };
    return{
        state,
    }
})
  