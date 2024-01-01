<script setup>
const go_to_github = () => {
    window.open('https://github.com/Cameron-Ord/Underrail-Feat-Calculator')
}
const go_to_linkedin=()=>{
    window.open('https://ca.linkedin.com/in/camord34')
}
</script>

<template>
    <div class="hero_about">
        <h3 @click="go_to_github">GitHub</h3>
        <h3 @click="go_to_github">Portfolio</h3>
        <h3 @click="go_to_github">Front end code</h3>
        <h3 @click="go_to_github">Back end code</h3>
        <h3 @click="go_to_linkedin">LinkedIn</h3>
    </div>
</template>
<style lang="scss" scoped>
.hero_about{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 80%;
    row-gap: 25px;
    column-gap: 15px;
    transition: 0.3s ease-in-out;
    opacity: 0;
    >h3{
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
