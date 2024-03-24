import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

interface Skill {
  skillName: string
  skillValue: number
}

interface SkillCategory {
  category: string
  skills: Skill[]
}

export const skill_state = defineStore('skill_state', () => {
  let skill_limiter: number = 0
  const max_skill_points = 1280
  const min_skill_points = 0

  const skills_list: SkillCategory[] = [
    {
      category: 'Offense',
      skills: [
        { skillName: 'Guns', skillValue: 0 },
        { skillName: 'Throwing', skillValue: 0 },
        { skillName: 'Crossbows', skillValue: 0 },
        { skillName: 'Melee', skillValue: 0 }
      ]
    },
    {
      category: 'Survivability',
      skills: [
        { skillName: 'Dodge', skillValue: 0 },
        { skillName: 'Evasion', skillValue: 0 }
      ]
    },
    {
      category: 'Subterfuge',
      skills: [
        { skillName: 'Stealth', skillValue: 0 },
        { skillName: 'Hacking', skillValue: 0 },
        { skillName: 'Lockpicking', skillValue: 0 },
        { skillName: 'Pickpocketing', skillValue: 0 },
        { skillName: 'Traps', skillValue: 0 }
      ]
    },
    {
      category: 'Crafting',
      skills: [
        { skillName: 'Mechanics', skillValue: 0 },
        { skillName: 'Tailoring', skillValue: 0 },
        { skillName: 'Biology', skillValue: 0 },
        { skillName: 'Chemistry', skillValue: 0 },
        { skillName: 'Electronics', skillValue: 0 }
      ]
    },
    {
      category: 'Psi',
      skills: [
        { skillName: 'Metathermics', skillValue: 0 },
        { skillName: 'Psychokinesis', skillValue: 0 },
        { skillName: 'Thought Control', skillValue: 0 },
        { skillName: 'Temporal Manipulation', skillValue: 0 }
      ]
    },
    {
      category: 'Social',
      skills: [
        { skillName: 'Persuasion', skillValue: 0 },
        { skillName: 'Intimidation', skillValue: 0 },
        { skillName: 'Mercantile', skillValue: 0 }
      ]
    }
  ]

  const increase_skill = (index: number, findex: number, event: MouseEvent | TouchEvent) => {
    const current_skill_value = skills_list[index]['skills'][findex]['skillValue']
    const max_increase = Math.min(max_skill_points - skill_limiter, 160 - current_skill_value)
    if (max_increase > 0) {
      let updated_limiter: number = skill_limiter
      let increase_amount: number
      const updated_list: SkillCategory[] = [...skills_list]
      if (event.shiftKey) {
        increase_amount = Math.min(5, max_increase)
      } else if (event.ctrlKey) {
        increase_amount = Math.min(80, max_increase)
      } else {
        increase_amount = Math.min(1, max_increase)
      }
      updated_list[index]['skills'][findex]['skillValue'] += increase_amount
      updated_limiter += increase_amount
      set_limiter(updated_limiter)
      set_list_values(updated_list, index, findex)
    }
  }

  const decrease_skill = (index: number, findex: number, event: MouseEvent | TouchEvent) => {
    const current_skill_value = skills_list[index]['skills'][findex]['skillValue']
    if (current_skill_value > min_skill_points) {
      let updated_limiter: number = skill_limiter
      let decrease_amount: number
      const updated_list: SkillCategory[] = [...skills_list]
      if (event.shiftKey) {
        decrease_amount = Math.min(5, current_skill_value)
      } else if (event.ctrlKey) {
        decrease_amount = Math.min(80, current_skill_value)
      } else {
        decrease_amount = Math.min(1, current_skill_value)
      }
      updated_list[index]['skills'][findex]['skillValue'] -= decrease_amount
      updated_limiter -= decrease_amount
      set_limiter(updated_limiter)
      set_list_values(updated_list, index, findex)
    }
  }

  const set_list_values = (updated_list: SkillCategory[], i: number, f: number) => {
    skills_list[i]['skills'][f]['skillValue'] = updated_list[i]['skills'][f]['skillValue']
    try {
      cookies.set('skill_cookie', JSON.stringify(skills_list))
    } catch (error) {
      console.log('Error parsing JSON : ', error)
    }
  }

  const mutate_array = (p_cookie: any) => {
    for (let i = 0; i < p_cookie.length; i++) {
      skills_list[i] = p_cookie[i]
    }
  }

  const load_from_cookies = () => {
    try {
      const limtr: string = cookies.get('skill_limiter')
      const skill_cookie: string = cookies.get('skill_cookie')
      if (skill_cookie !== null && limtr !== null) {
        const p_cookie: any = JSON.parse(skill_cookie)
        const p_limtr: number = JSON.parse(limtr)
        skill_limiter = p_limtr
        mutate_array(p_cookie)
        return skills_list
      } else {
        return null
      }
    } catch (error) {
      console.log('Error parsing JSON : ', error)
      return null
    }
  }

  const get_skill_list = () => {
    return skills_list
  }

  const get_flattened_list = () => {
    const flattened_list = []
    for (let i = 0; i < skills_list.length; i++) {
      const sub_list: Skill[] = skills_list[i]['skills']
      for (let f = 0; f < sub_list.length; f++) {
        flattened_list.push(sub_list[f])
      }
    }
    return flattened_list
  }

  const get_flattened_list_len = () => {
    const flattened_list = []
    for (let i = 0; i < skills_list.length; i++) {
      const sub_list: Skill[] = skills_list[i]['skills']
      for (let f = 0; f < sub_list.length; f++) {
        flattened_list.push(sub_list[f])
      }
    }
    return flattened_list.length
  }

  const get_skill_list_len = () => {
    return skills_list.length
  }

  const get_skill_limiter = () => {
    return skill_limiter
  }

  const reset_all_skills = () => {
    for (let i = 0; skills_list.length; i++) {
      for (let f = 0; skills_list[i]['skills'].length; f++) {
        const skill_value = 0
        skills_list[i]['skills'][f]['skillValue'] = skill_value
      }
    }
    skill_limiter = 0
  }

  const set_limiter = (num: number) => {
    skill_limiter = num
    try {
      cookies.set('skill_limiter', JSON.stringify(skill_limiter))
    } catch (error) {
      console.log('Error during stringification : ', error)
    }
  }

  const set_base_cookies = () => {
    cookies.set('skill_cookie', JSON.stringify(skills_list))
  }

  const get_specific_value = (i: number, f: number) => {
    return skills_list[i]['skills'][f]['skillValue']
  }

  return {
    skills_list,
    get_specific_value,
    set_base_cookies,
    load_from_cookies,
    get_skill_list,
    reset_all_skills,
    get_skill_limiter,
    increase_skill,
    decrease_skill,
    get_skill_list_len,
    get_flattened_list,
    get_flattened_list_len
  }
})
