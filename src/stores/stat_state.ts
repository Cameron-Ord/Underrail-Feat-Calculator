import { defineStore } from 'pinia'

export const stat_state = defineStore('stat_state', () => {


  const stats_list = [
    { 'Name': 'Strength', 'Value': 5 },
    { 'Name': 'Dexterity', 'Value': 5 },
    { 'Name': 'Agility', 'Value': 5 },
    { 'Name': 'Constitution', 'Value': 5 },
    { 'Name': 'Perception', 'Value': 5 },
    { 'Name': 'Will', 'Value': 5 },
    { 'Name': 'Intelligence', 'Value': 5 }
  ] as Array<{Name: string; Value: number}>

  const get_stat_list=()=>{
      return stats_list;
  }

  const reset_all_stats = () => {
    for(let i = 0; stats_list.length; i++){
      let stat_value: number = stats_list[i]['Value'];
      stat_value = 5;
      stats_list[i]['Value'] = stat_value;
    }
  }




  return {
    stats_list,
    get_stat_list,
    reset_all_stats
  }
})

