<script setup>
const handle_click = (target_text) => {
    switch (target_text) {
        case "GitHub":
            window.open('https://github.com/Cameron-Ord')
            break;
        case "Portfolio":
            window.open('https://portfolio.cameron-ord.online/')
            break;
        case "Front end code":
            window.open('https://github.com/Cameron-Ord/Underrail-Feat-Calculator');
            break;
        case "Back end code":
            window.open('https://github.com/Cameron-Ord/UnderrailFeatBackend')
            break;
        case "LinkedIn":
            window.open('https://ca.linkedin.com/in/camord34');
            break;
    default:
            break;
    }
}
</script>

<template>
    <div class="hero_about">
        <h3 @click="handle_click($event.target.innerText)">GitHub</h3>
        <h3 @click="handle_click($event.target.innerText)">Portfolio</h3>
        <h3 @click="handle_click($event.target.innerText)">Front end code</h3>
        <h3 @click="handle_click($event.target.innerText)">Back end code</h3>
        <h3 @click="handle_click($event.target.innerText)">LinkedIn</h3>
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
