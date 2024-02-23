import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies();
export const stat_state = defineStore('stat_state', () => {


  let stat_limiter: number = 35
  const max_stat_points: number = 46;
  const min_stat_points: number = 3;

  const stats_list = [
    { 'statName': 'Strength', 'statValue': 5 },
    { 'statName': 'Dexterity', 'statValue': 5 },
    { 'statName': 'Agility', 'statValue': 5 },
    { 'statName': 'Constitution', 'statValue': 5 },
    { 'statName': 'Perception', 'statValue': 5 },
    { 'statName': 'Will', 'statValue': 5 },
    { 'statName': 'Intelligence', 'statValue': 5 }
  ] as Array<{ statName: string; statValue: number }>


  const decrease_stat = (index: number, event: MouseEvent) => {
    const current_stat_value: number = stats_list[index]['statValue'];
    if (current_stat_value > min_stat_points) {
      let updated_limiter: number = stat_limiter;
      let decrease_amount: number;
      const updated_list: Array<{ statName: string; statValue: number }> = [...stats_list];

      if (event.shiftKey) {
        decrease_amount = Math.min(5, current_stat_value - min_stat_points);
      } else if (event.ctrlKey) {
        decrease_amount = Math.min(10, current_stat_value - min_stat_points);
      } else {
        decrease_amount = Math.min(1, current_stat_value - min_stat_points);
      }

      updated_list[index]['statValue'] -= decrease_amount;
      updated_limiter -= decrease_amount;
      set_limiter(updated_limiter);
      set_list_values(updated_list, index);
    }
  }

  const increase_stat = (index: number, event: MouseEvent) => {
    const current_stat_value: number = stats_list[index]['statValue'];
    const max_increase: number = Math.min(max_stat_points - stat_limiter, 20 - current_stat_value);
    if (max_increase > 0) {
      let updated_limiter: number = stat_limiter;
      let increase_amount: number;
      const updated_list: Array<{ statName: string; statValue: number }> = [...stats_list];
      if (event.shiftKey) {
        increase_amount = Math.min(5, max_increase);
      } else if (event.ctrlKey) {
        increase_amount = Math.min(10, max_increase);
      } else {
        increase_amount = Math.min(1, max_increase);
      }

      updated_list[index]['statValue'] += increase_amount;
      updated_limiter += increase_amount;
      set_limiter(updated_limiter);
      set_list_values(updated_list, index);
    }
  }

  const set_list_values = (updated_list: Array<{ statName: string; statValue: number }>, i: number) => {
    stats_list[i]['statValue'] = updated_list[i]['statValue'];
    try {
      cookies.set('stat_cookie', JSON.stringify(stats_list));
    } catch (error) {
      console.log("Error parsing JSON : ", error);
    }
  }

  const mutate_array = (p_cookie: any) => {
    for (let i = 0; i < p_cookie.length; i++) {
      stats_list[i] = p_cookie[i];
    }
  }

  const load_from_cookies = () => {
    try {
      const limtr: string = cookies.get('stat_limiter');
      const stat_cookie: string = cookies.get('stat_cookie');
      if (stat_cookie !== null) {
        const p_cookie: any = JSON.parse(stat_cookie);
        const p_limtr: number = JSON.parse(limtr);
        stat_limiter = p_limtr;
        mutate_array(p_cookie);
        return stats_list;
      }
      return null;
    } catch (error) {
      console.log("Error parsing JSON : ", error);
      return null;
    }
  }

  const get_stat_list = () => {
    return stats_list;
  }

  const get_stat_list_len = () => {
    return stats_list.length;
  }

  const get_limiter_value = (): number => {
    return stat_limiter;
  }

  const reset_all_stats = () => {
    for (let i = 0; stats_list.length; i++) {
      let stat_value: number = stats_list[i]['statValue'];
      stat_value = 5;
      stats_list[i]['statValue'] = stat_value;
    }
    stat_limiter = 35;
  }

  const set_limiter = (num: number) => {
    stat_limiter = num;
    try {
      cookies.set('stat_limiter', JSON.stringify(stat_limiter));
    } catch (error) {
      console.log('Error during stringification : ', error);
    }
  }



  return {
    load_from_cookies,
    stats_list,
    get_stat_list,
    reset_all_stats,
    get_limiter_value,
    increase_stat,
    decrease_stat,
    get_stat_list_len
  }
})

