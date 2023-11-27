<template>
    <div>
        <h3 @click="resetSkills">Reset Skills</h3>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance} from 'vue';
import { useSkillsStore } from '../stores/skillsStore';
const stored_values = useSkillsStore();
const instance = getCurrentInstance().appContext.app;
const { $cookies } = instance.config.globalProperties;
let skillLimiter = ref(null);
let nums = ref(null);
const skills = [
  'Guns', 'Throwing', 'Crossbows', 'Melee', 'Dodge', 'Evasion', 'Stealth',
  'Hacking', 'Lockpicking', 'Pickpocketing', 'Traps', 'Mechanics', 'Temporal Manipulation',
  'Persuasion', 'Intimidation', 'Mercantile', 'Metathermics', 'Psychokinesis',
  'Thought Control', 'Tailoring', 'Biology', 'Chemistry', 'Electronics'
];

const setCookies = () => {
    $cookies.set('skillLimiter', JSON.stringify(skillLimiter.value));
    $cookies.set('skillVal', JSON.stringify(nums.value))
}
const resetSkills = () =>{
    const [limiter, nums_arr] = stored_values.reset_skills(skills);
    skillLimiter.value = limiter;
    nums.value = nums_arr;
    setCookies();
}
</script>
<style lang="scss" scoped>

</style>