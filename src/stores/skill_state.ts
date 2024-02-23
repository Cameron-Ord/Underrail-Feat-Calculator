import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies();
export const skill_state = defineStore('skill_state', () => {

  let skill_limiter: number = 0;
  const max_skill_points = 1280;
  const min_skill_points = 0;
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


  const increase_skill = (index: number, event: MouseEvent) => {
    const current_skill_value = skills_list[index]['skillValue'];
    const max_increase = Math.min(max_skill_points - skill_limiter, 160 - current_skill_value);
    if(max_increase > 0){
      let updated_limiter: number = skill_limiter;
      let increase_amount: number;
      const updated_list: Array<{skillName: string; skillValue: number}> = [...skills_list];
      if(event.shiftKey){
          increase_amount = Math.min(5, max_increase);
      } else if(event.ctrlKey){
          increase_amount = Math.min(80, max_increase);
      } else {
          increase_amount = Math.min(1, max_increase);
      }
      updated_list[index]['skillValue'] += increase_amount;
      updated_limiter += increase_amount;
      set_limiter(updated_limiter);
      set_list_values(updated_list, index);
    }
  }

  const decrease_skill = (index: number, event: MouseEvent) => {
    const current_skill_value = skills_list[index]['skillValue'];
    if(current_skill_value > min_skill_points){
      let updated_limiter: number = skill_limiter;
      let decrease_amount: number;
      const updated_list: Array<{skillName: string; skillValue: number}> = [...skills_list];
      if(event.shiftKey){
        decrease_amount = Math.min(5, current_skill_value);
      } else if(event.ctrlKey){
          decrease_amount = Math.min(80, current_skill_value);
      } else {
          decrease_amount = Math.min(1, current_skill_value);
      }
      updated_list[index]['skillValue'] -= decrease_amount;
      updated_limiter -= decrease_amount;
      set_limiter(updated_limiter);
      set_list_values(updated_list, index);
    }
  }

  const set_list_values=(updated_list: Array<{skillName: string; skillValue: number}>, i:number)=>{
    skills_list[i]['skillValue'] = updated_list[i]['skillValue'];
    try {
      cookies.set('skill_cookie', JSON.stringify(skills_list));    
    } catch (error) {
      console.log("Error parsing JSON : ", error);
    }
  }

  const load_from_cookies = () =>{

  }

  const get_skill_list=()=>{
    return skills_list;
  }
  
  const get_skill_list_len=()=>{
    return skills_list.length;
  }

  const get_skill_limiter = () => {
    return skill_limiter;
  }
  
  const reset_all_skills = () => {
    for(let i = 0; skills_list.length; i++){
      let skill_value: number = skills_list[i]['skillValue'];
      skill_value = 5;
      skills_list[i]['skillValue'] = skill_value;
    }
    skill_limiter = 0;
  }
  
  const set_limiter = (num: number) => {
    skill_limiter = num;
  }


  return {
    skills_list,
    get_skill_list,
    reset_all_skills,
    get_skill_limiter,
    increase_skill,
    decrease_skill,
    get_skill_list_len
  }
})
