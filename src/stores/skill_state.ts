import { defineStore } from 'pinia'

export const skill_state = defineStore('skill_state', () => {

  const skills_list = [
    { 'skillName': 'Guns', 'skillValue': 0 },
    { 'skillName': 'Throwing', 'skillValue': 0 },
    { 'skillName': 'Crossbows', 'skillValue': 0 },
    { 'skillName': 'Melee', 'skillValue': 0 },
    { 'skillName': 'Dodge', 'skillValue': 0 },
    { 'skillName': 'Evasion', 'skillValue': 0 },
    { 'skillName': 'Stealth', 'skillValue': 0 },
    { 'skillName': 'Hacking', 'skillValue': 0 },
    { 'skillName': 'Lockpicking', 'skillValue': 0 },
    { 'skillName': 'Pickpocketing', 'skillValue': 0 },
    { 'skillName': 'Traps', 'skillValue': 0 },
    { 'skillName': 'Mechanics', 'skillValue': 0 },
    { 'skillName': 'Temporal Manipulation', 'skillValue': 0 },
    { 'skillName': 'Persuasion', 'skillValue': 0 },
    { 'skillName': 'Intimidation', 'skillValue': 0 },
    { 'skillName': 'Mercantile', 'skillValue': 0 },
    { 'skillName': 'Metathermics', 'skillValue': 0 },
    { 'skillName': 'Psychokinesis', 'skillValue': 0 },
    { 'skillName': 'Thought Control', 'skillValue': 0 },
    { 'skillName': 'Tailoring', 'skillValue': 0 },
    { 'skillName': 'Biology', 'skillValue': 0 },
    { 'skillName': 'Chemistry', 'skillValue': 0 },
    { 'skillName': 'Electronics', 'skillValue': 0 }
  ] as Array<{skillName: string; skillValue: number}>

  const get_skill_list=()=>{
    return skills_list;
  }

  const reset_all_skills = () => {
    for(let i = 0; skills_list.length; i++){
      let skill_value: number = skills_list[i]['skillValue'];
      skill_value = 5;
      skills_list[i]['skillValue'] = skill_value;
    }
  }

  return {
    skills_list, get_skill_list, reset_all_skills
  }
})
