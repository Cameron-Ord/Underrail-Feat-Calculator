import { defineStore } from 'pinia'
import {useCookies} from 'vue3-cookies'
const {cookies} = useCookies();
export const types_state = defineStore('types_state', () => {
    const plus = '/svgs/plus.svg';
    const minus = '/svgs/minus.svg';

    const type_list = [
        'Knife', 'Sword', 'Fist', 'Spear',
        'Hammer', 'Pistol', 'Assault Rifle',
        'Enery Pistol', 'Throwing Knives', 'Crossbow',
        'Jetski', 'Sniper Rifle', 'Stealth', 'Spear',
        'Traps', 'Crafting', 'Throwing', 'Grenades',
        'Shotgun', 'Thought Control', 'Metathermics',
        'Psychokinesis', 'Temporal Manipulation'
    ] as Array<string>

    const chosen_list: Array<{Type: string, Svg: string}> = new Array();

    const save_selection = () => {
        cookies.set('type_selection', JSON.stringify(chosen_list));
    }

    const pop_array = () => {
        chosen_list.pop();
        if(chosen_list.length > 0){
            pop_array();
        }
    }

    const load_from_cookies = (): number => {
        const list_str: string = cookies.get('type_selection');
        try {
            const parsed_list: Array<{Type: string, Svg: string}> = JSON.parse(list_str);
            if(chosen_list.length > 0){
                pop_array();
            }
            for(let i = 0; i < parsed_list.length; i++){
                chosen_list.push(parsed_list[i]);
            }
            if(chosen_list.length > 0){
                return 0;
            }
        } catch (error) {
            console.error("Erroring parsing JSON: ", error)
            return -1
        }
        return -1
    }

    const remove_from_chosen = (index: number): boolean => {
        const initial_len = chosen_list.length;
        chosen_list.splice(index, 1);
        const final_len = chosen_list.length;
        if(initial_len >= final_len){
            save_selection();
            return true;
        }
        return false;
    }

    const add_to_chosen = (selection: {Type: string, Svg: string}): boolean => {
        const initial_len = chosen_list.length;
        selection['Svg']= minus;
        chosen_list.push(selection);
        const final_len = chosen_list.length;
        if(initial_len < final_len){
            save_selection();
            return true;
        }
        return false;
    }

    const check_cookie = () => {
        const cookie_name: string = 'type_selection'
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++){
            const cookie = cookies[i].trim();
            if(cookie.substring(0, cookie_name.length + 1,)===(cookie_name + "=")){
                return true;
            }
        }
        return false;
    }

    const get_list = () => {
        const temp_list = new Array();
        for(let i = 0; i < type_list.length; i++){
            temp_list.push({"Type": type_list[i], "Svg": plus});
        }
        temp_list.sort((a,b)=>a.Type.localeCompare(b.Type));
        return temp_list;
    }

    const get_chosen = () => {  
        chosen_list.sort((a,b)=>a.Type.localeCompare(b.Type));
        return chosen_list;
    }

    return {
        type_list, 
        chosen_list, 
        get_list, 
        get_chosen, 
        add_to_chosen, 
        remove_from_chosen,
        load_from_cookies, 
        check_cookie
    }
})

