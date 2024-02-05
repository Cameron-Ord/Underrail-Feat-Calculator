import { defineStore } from 'pinia'

export const stat_state = defineStore('stat_state', () => {


  const stats_list = [
    { 'statName': 'Strength', 'statValue': 5 },
    { 'statName': 'Dexterity', 'statValue': 5 },
    { 'statName': 'Agility', 'statValue': 5 },
    { 'statName': 'Constitution', 'statValue': 5 },
    { 'statName': 'Perception', 'statValue': 5 },
    { 'statName': 'Will', 'statValue': 5 },
    { 'statName': 'Intelligence', 'statValue': 5 }
  ] as Array<{statName: string; statValue: number}>

  const get_stat_list=()=>{
      return stats_list;
  }

  const reset_all_stats = () => {
    for(let i = 0; stats_list.length; i++){
      let stat_value: number = stats_list[i]['statValue'];
      stat_value = 5;
      stats_list[i]['statValue'] = stat_value;
    }
  }




  return {
    stats_list,
    get_stat_list,
    reset_all_stats
  }
})

