<script setup>
import {ref, watch, getCurrentInstance} from 'vue';
import { useSkillsStore } from '../stores/skillsStore';
import { onBeforeMount } from 'vue';
const instance = getCurrentInstance().appContext.app;
const { $cookies } = instance.config.globalProperties;

const skillStore = useSkillsStore();
const skillLimiter = ref(null);
const nums = ref(null)
const skills = [
  'Guns', 'Throwing', 'Crossbows', 'Melee', 'Dodge', 'Evasion', 'Stealth',
  'Hacking', 'Lockpicking', 'Pickpocketing', 'Traps', 'Mechanics', 'Temporal Manipulation',
  'Persuasion', 'Intimidation', 'Mercantile', 'Metathermics', 'Psychokinesis',
  'Thought Control', 'Tailoring', 'Biology', 'Chemistry', 'Electronics'
];

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

const setSkills = () => {
    console.log('setting',)
    const newLimiter = 0;
    const newNums = [];
    for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];
        newNums.push({
        skillName: skill,
        skillValue: 0,
        });
    }
    return [newLimiter, newNums];
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
        console.log('not here')
        skillLimiter.value = parseInt(limiter, 10);
        nums.value = convert_to_int(JSON.parse(nums_str));
    } else {
        const [returned_limiter, returned_nums] = setSkills();
        console.log(returned_nums)
        skillLimiter.value = parseInt(returned_limiter, 10);
        nums.value = convert_to_int(returned_nums);
        console.log(nums.value)
        saveCookie();
        saveLimiter();
    }
};

onBeforeMount(()=>{
    checkCookies();
})

watch(() => skillStore.skillLimiter, (newVal) => {
  skillLimiter.value = newVal;
});


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
      </span>
    </div>
  </template>

<style lang="scss" scoped>

</style>