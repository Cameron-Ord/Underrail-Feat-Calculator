import { defineStore } from 'pinia';
export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skillLimiter: null,
    nums: null
  }),
  actions: {
    reset_skills(skills){
        this.skillLimiter = 0;
        this.nums = [];
        for(let i = 0; i < skills.length; i++){
            const skill = skills[i];
            this.nums.push({
                skillName: skill,
                skillValue: 0
            });
        }
        return [this.skillLimiter, this.nums]
    }
  },
});

