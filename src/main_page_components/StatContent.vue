<script setup>

</script>

<template>
    <div class="_stat_content" v-if="nums !== undefined">
      <span class="_looped_container">
        <div class="_loop_div" v-for="(value, i) in nums" :key="i">
          <div class="_stat_name">
            <p class="_stat_tag">{{ stats[i] }}</p>
          </div>
          <div class="_stat_values">
            <h3 class="_value">{{ value.statValue }}</h3>
            <img
              src="images/plus.svg"
              alt="plus"
              class="_plus"
              @click="increaseValue(i)"
              :clicked_plus="i"
              ref="_plus_svg"
            />
            <img
              src="images/minus.svg"
              alt="minus"
              class="_minus"
              @click="decreaseValue(i)"
              :clicked_minus="i"
              ref="_minus_svg"
            />
          </div>
        </div>
      </span>
    </div>
</template>

<script>
export default{
    data() {
        return {
            nums: undefined,
            statLimiter: undefined,
            stats: [
            'Strength',
            'Dexterity',
            'Agility',
            'Constitution',
            'Perception',
            'Will',
            'Intelligence'
            ]
        }
    },
    methods:{
        increaseValue(i){
            console.log(this.statLimiter)
            if(this.statLimiter !== undefined
            && this.statLimiter >= 21 && this.statLimiter < 46){
                if(this.nums[i].statValue < 20){
                    this.nums[i].statValue++;
                    this.saveCookie();
                    this.statLimiter++;
                    this.saveLimiter();
                }
            }
        },
        decreaseValue(i){
            console.log(i)
            if(this.statLimiter !== undefined
            && this.statLimiter > 21 && this.statLimiter <= 46){
                if(this.nums[i].statValue > 3){
                    this.nums[i].statValue--;
                    this.saveCookie();
                    this.statLimiter--;
                    this.saveLimiter();
                }
            }
        },
        saveCookie(){
            this.$cookies.set('statVal', JSON.stringify(this.nums));
        },
        saveLimiter(){
            this.$cookies.set('statLimiter', JSON.stringify(this.statLimiter));
        },
        set_stats(){
            console.log('setting stats')
            this.statLimiter = 35;
            this.nums = [];
            for(let i = 0; i < this.stats.length; i++){
                const stat = this.stats[i];
                console.log(stat);
                this.nums.push({
                    statName: stat,
                    statValue: 5
                });
            }
            console.log(this.nums)
            this.$cookies.set('statLimiter', JSON.stringify(this.statLimiter));
            this.$cookies.set('statVal', JSON.stringify(this.nums));
        },
        convert_to_int(num_str_array){
            let i = 0;
            while(i<num_str_array.length)
            {
                num_str_array[i].statValue = parseInt(num_str_array[i].statValue)
                i++;
            }
            return num_str_array
        },
        check_cookies(){
            let limiter = this.$cookies.get('statLimiter');
            let nums = this.$cookies.get('statVal');
            if(JSON.parse(limiter) !== null && JSON.parse(nums) !== null){
               const statLimiter = parseInt(JSON.parse(limiter), 10);
               const statNums = this.convert_to_int(JSON.parse(nums));
               this.statLimiter = statLimiter;
               this.nums = statNums
            } else if(JSON.parse(limiter) === null && JSON.parse(nums) === null){
                this.set_stats();
            }
        }
    },
    created(){
        this.check_cookies();
    }
}

</script>