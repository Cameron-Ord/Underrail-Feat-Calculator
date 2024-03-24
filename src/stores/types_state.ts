import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()
export const types_state = defineStore('types_state', () => {
  const plus = '/svgs/plus.svg'
  const minus = '/svgs/minus.svg'

  const type_list = [
    'Knife',
    'Sword',
    'Fist',
    'Hammer',
    'Pistol',
    'Assault Rifle',
    'Enery Pistol',
    'Throwing Knives',
    'Crossbow',
    'Jetski',
    'Sniper Rifle',
    'Stealth',
    'Spear',
    'Traps',
    'Crafting',
    'Throwing',
    'Grenades',
    'Shotgun',
    'Thought Control',
    'Metathermics',
    'Psychokinesis',
    'Temporal Manipulation'
  ] as Array<string>
  const chosen_list: Array<string> = new Array()

  const save_selection = () => {
    cookies.set('type_selection', JSON.stringify(chosen_list))
  }

  const get_default_list = () => {
    return type_list
  }

  const pop_array = () => {
    if (chosen_list.length > 0) {
      chosen_list.pop()
      pop_array()
    }
  }

  const load_chosen_list = (): { result: number } => {
    const saved_list: string = cookies.get('type_selection')
    if (saved_list !== null) {
      try {
        pop_array()
        const parsed_list: Array<string> = JSON.parse(saved_list)
        for (let i = 0; i < parsed_list.length; i++) {
          const item: string = parsed_list[i]
          chosen_list.push(item)
        }
        return { result: 0 }
      } catch (error) {
        console.log('Error parsing JSON : ', error)
        return { result: -1 }
      }
    }
    return { result: -1 }
  }

  const get_chosen_list = () => {
    return chosen_list
  }

  const check_list = (type_text: string): { found: boolean; index: number } => {
    for (let i = 0; i < chosen_list.length; i++) {
      const chosen_item: string = chosen_list[i]
      if (chosen_item === type_text) {
        return { found: true, index: i }
      }
    }
    return { found: false, index: -1 }
  }

  const remove_from_chosen = (index: number) => {
    chosen_list.splice(index, 1)
  }

  const add_to_chosen = (type_text: string) => {
    chosen_list.push(type_text)
  }

  return {
    type_list,
    chosen_list,
    check_list,
    remove_from_chosen,
    add_to_chosen,
    get_chosen_list,
    load_chosen_list,
    save_selection,
    get_default_list
  }
})
