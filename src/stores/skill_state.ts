import { defineStore } from 'pinia'

export const skill_state = defineStore('skill_state', () => {

  const skills_list = [
    { 'Name': 'Guns', 'Value': 0 },
    { 'Name': 'Throwing', 'Value': 0 },
    { 'Name': 'Crossbows', 'Value': 0 },
    { 'Name': 'Melee', 'Value': 0 },
    { 'Name': 'Dodge', 'Value': 0 },
    { 'Name': 'Evasion', 'Value': 0 },
    { 'Name': 'Stealth', 'Value': 0 },
    { 'Name': 'Hacking', 'Value': 0 },
    { 'Name': 'Lockpicking', 'Value': 0 },
    { 'Name': 'Pickpocketing', 'Value': 0 },
    { 'Name': 'Traps', 'Value': 0 },
    { 'Name': 'Mechanics', 'Value': 0 },
    { 'Name': 'Temporal Manipulation', 'Value': 0 },
    { 'Name': 'Persuasion', 'Value': 0 },
    { 'Name': 'Intimidation', 'Value': 0 },
    { 'Name': 'Mercantile', 'Value': 0 },
    { 'Name': 'Metathermics', 'Value': 0 },
    { 'Name': 'Psychokinesis', 'Value': 0 },
    { 'Name': 'Thought Control', 'Value': 0 },
    { 'Name': 'Tailoring', 'Value': 0 },
    { 'Name': 'Biology', 'Value': 0 },
    { 'Name': 'Chemistry', 'Value': 0 },
    { 'Name': 'Electronics', 'Value': 0 }
  ] as Array<{Name: string; Value: number}>

  const get_skill_list=()=>{
    return skills_list;
  }

  const reset_all_skills = () => {
    for(let i = 0; skills_list.length; i++){
      let skill_value: number = skills_list[i]['Value'];
      skill_value = 5;
      skills_list[i]['Value'] = skill_value;
    }
  }

  return {
    skills_list, get_skill_list, reset_all_skills
  }
})
