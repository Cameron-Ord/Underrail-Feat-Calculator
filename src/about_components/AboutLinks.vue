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
        <h2 @click="go_to_github">GitHub</h2>
        <h2 @click="go_to_linkedin">LinkedIn</h2>
    </div>
</template>
<style lang="scss" scoped>
.hero_about{
    display: grid;
    align-items: center;
    justify-items: center;
    width: 90%;
    grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
    grid-template-rows: auto auto;
    row-gap: 10px;

    >h2{
        cursor: pointer;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 7.5px;
        padding-right: 7.5px;
        border: solid var(--orange) 1px;
        border-radius: 10px;
    }
}
</style>