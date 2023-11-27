<script setup>
import { useSkillsStore } from '../stores/skillsStore';
import { ref,watch, getCurrentInstance} from 'vue';
import { onBeforeMount } from 'vue';
const instance = getCurrentInstance().appContext.app;
const { $cookies } = instance.config.globalProperties;
const stored_values = useSkillsStore();
let skillLimiter = ref(stored_values.skillLimiter);
let nums = ref(stored_values.nums);
const skills = [
  'Guns', 'Throwing', 'Crossbows', 'Melee', 'Dodge', 'Evasion', 'Stealth',
  'Hacking', 'Lockpicking', 'Pickpocketing', 'Traps', 'Mechanics', 'Temporal Manipulation',
  'Persuasion', 'Intimidation', 'Mercantile', 'Metathermics', 'Psychokinesis',
  'Thought Control', 'Tailoring', 'Biology', 'Chemistry', 'Electronics'
];

watch(skillLimiter, (newVal, oldVal) => {
  console.log("UPDATED VALUES: ", newVal, oldVal);
  let skillLimiter = newVal
  console.log(skillLimiter)


}, { deep: true });

watch(stored_values, (newVal, oldVal) => {
    if(newVal.nums !== null && oldVal.nums !== null){
        console.log("WATCHED: ",newVal.skillLimiter, newVal.nums, oldVal.skillLimiter, oldVal.nums);
        skillLimiter.value = newVal.skillLimiter
        for(let i = 0; i < newVal.nums.length; i++){
            const num = newVal.nums[i]
            nums.value[i].skillValue = num.skillValue;
        }
    }
}, { deep: true });

const saveCookie = () => {
    $cookies.set('skillVal', JSON.stringify(nums.value))
}

const saveLimiter = () => {
    $cookies.set('skillLimiter', JSON.stringify(skillLimiter.value))
}

const increaseValue = (i) => {
  if (skillLimiter.value >= 0 && skillLimiter.value < 1280) {
    if (nums.value[i].skillValue < 160) {
      nums.value[i].skillValue += 5;
      skillLimiter.value += 5;
      saveLimiter();
      saveCookie();
    }
  }
};

const decreaseValue = (i) => {
  if (skillLimiter.value > 0 && skillLimiter.value <= 1280) {
    if (nums.value[i].skillValue > 0) {
      nums.value[i].skillValue -= 5;
      skillLimiter.value -= 5;
      saveLimiter();
      saveCookie();
    }
  }
};

 
const convert_to_int = (num_str_array) => {
    console.log('converting')
    let i = 0;
    while(i<num_str_array.length)
    {
        num_str_array[i].skillValue = parseInt(num_str_array[i].skillValue, 10)
        i++;
    }
    return num_str_array
};

const checkCookies = () => {
    const limiter = $cookies.get('skillLimiter');
    const nums_str = $cookies.get('skillVal');
    if(JSON.parse(limiter) !== null && JSON.parse(nums_str) !== null) {
        skillLimiter.value = parseInt(JSON.parse(limiter), 10);
        nums.value = convert_to_int(JSON.parse(nums_str));
    } else {
        const [returned_limiter, returned_nums] = stored_values.reset_skills(skills);
        skillLimiter.value = returned_limiter;
        nums.value = returned_nums;
        saveCookie();
        saveLimiter();
    }
};

onBeforeMount(()=>{
    checkCookies();
})

</script>
<template>
    <div class="skillsParent" v-if="nums !== null || undefined">
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
        <div class="skill_counter">
            <p class="skill_pts_used">Skill Points used: {{ skillLimiter }}</p>
        </div>
      </span>
    </div>
  </template>

<style lang="scss" scoped>

</style>