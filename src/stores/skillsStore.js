import { defineStore } from 'pinia';
export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skillLimiter: undefined,
    nums: undefined,
    skills: [
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
  }),
  getters:{

  },
  actions: {

    setSkills() {
      this.skillLimiter = 0;
      this.nums = [];
      for (let i = 0; i < this.skills.length; i++) {
        const skill = this.skills[i];
        
        this.nums.push({
          skillName: skill,
          skillValue: 0,
        });
      }

      return [this.skillLimiter, this.nums]
    },
  },
});