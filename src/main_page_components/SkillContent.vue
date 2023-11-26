<script setup>

</script>


<template>
    <div class="skillsParent" v-if="nums !== undefined">
      <span class="btnSpan">
        <div class="skillsContainer" v-for="(value, i) in nums" :key="i">
          <div class="nameSeperator">
            <p class="skillName">{{ skills[i] }}</p>
          </div>
          <div class="skillSeperator">
            <h3 class="value">{{ value.skillValue }}</h3>
            <img
              src="images/plus.svg"
              alt="plus"
              class="plus"
              @click="increaseValue(i)"
              :clicked_plus="i"
              ref="plusClicked"
            />
            <img
              src="images/minus.svg"
              alt="minus"
              class="minus"
              @click="decreaseValue(i)"
              :clicked_minus="i"
              ref="minusClicked"
            />
          </div>
        </div>
      </span>
    </div>
  </template>

<script>
    export default {
        data() {
            return {
                nums: undefined,
                skillLimiter: undefined,
                skills: [
                'Guns',
                'Throwing',
                'Crossbows',
                'Melee',
                'Dodge',
                'Evasion',
                'Stealth',
                'Hacking',
                'Lockpicking',
                'Pickpocketing',
                'Traps',
                'Mechanics',
                'Temporal Manipulation',
                'Persuasion',
                'Intimidation',
                'Mercantile',
                'Metathermics',
                'Psychokinesis',
                'Thought Control',
                'Tailoring',
                'Biology',
                'Chemistry',
                'Electronics'
                ]
            }
        },
        methods:{
            increaseValue(i) {
                if (this.skillLimiter >= 0 && this.skillLimiter < 1280) {
                    if (this.nums[i].skillValue < 160) {
                    this.nums[i].skillValue += 5
                    this.skillLimiter += 5
                    this.saveLimiter()
                    this.saveCookie()
                    }
                }
            },
            decreaseValue(i) {
                if (this.skillLimiter > 0 && this.skillLimiter <= 1280) {
                    if (this.nums[i].skillValue > 0) {
                    this.nums[i].skillValue -= 5
                    this.skillLimiter -= 5
                    this.saveLimiter()
                    this.saveCookie()
                    }
                }
            },
            saveCookie(){
                this.$cookies.set('skillVal', JSON.stringify(this.nums));
            },
            saveLimiter(){
                this.$cookies.set('skillLimiter', JSON.stringify(this.skillLimiter));
            },

            set_skills(){
                console.log('setting skills')
                this.skillLimiter = 0;
                this.nums = [];
                for(let i = 0; i < this.skills.length; i++){
                    const skill = this.skills[i];
                    console.log(skill);
                    this.nums.push({
                        skillName: skill,
                        skillValue: 0
                    });
                }
                console.log(this.nums)
                this.$cookies.set('skillLimiter', JSON.stringify(this.skillLimiter));
                this.$cookies.set('skillVal', JSON.stringify(this.nums));
            },

            convert_to_int(num_str_array){
                let i = 0;
                while(i<num_str_array.length)
                {
                    num_str_array[i].skillValue = parseInt(num_str_array[i].skillValue)
                    i++;
                }
                return num_str_array
            },

            check_cookies(){
                let limiter = this.$cookies.get('skillLimiter');
                let nums = this.$cookies.get('skillVal');
                if(JSON.parse(limiter) !== null && JSON.parse(nums) !== null){
                const skillLimiter = parseInt(JSON.parse(limiter), 10);
                const skillNums = this.convert_to_int(JSON.parse(nums));
                this.skillLimiter = skillLimiter;
                this.nums = skillNums
                } else if(JSON.parse(limiter) === null && JSON.parse(nums) === null){
                    this.set_skills();
                }
            }
        },
        created(){
            this.check_cookies();
        }
    }
</script>

<style lang="scss" scoped>

</style>