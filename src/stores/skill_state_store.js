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

    const actions = {

        get_limiter(){
            return state.skill_count_limiter;
        },

        get_items(){
            return state.skill_items_array;
        },

        set_default_values(){
            const skill_limiter = 0;
            const skill_items = [];
            for(let i = 0; i < state.skills_list.length; i++){
                const skill = state.skills_list[i];
                skill_items.push({
                    skillName: skill,
                    skillValue: 0
                });
            }
            return [skill_limiter, skill_items]
        }
    }

    return{
        state,
        actions
    }
})
  