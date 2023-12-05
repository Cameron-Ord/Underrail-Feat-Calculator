<script setup>
const go_to_github = () => {
    window.open('https://github.com/Cameron-Ord')
}
const go_to_linkedin=()=>{
    window.open('https://ca.linkedin.com/in/camord34')
}
</script>

<template>
    <div class="hero_about">
        <img @click="go_to_github" class="img_tag" src="/images/GitHub_Logo_White.png" alt="">
        <img @click="go_to_linkedin" src="/images/linkedin.svg" alt="">
    </div>
</template>
<style lang="scss" scoped>
.hero_about{
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    
    >.img_tag{
        width: 75px;
        cursor: pointer;
    }
}
</style>