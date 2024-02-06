<script setup lang="ts">

const handle_click = (event_target: EventTarget | null) => {
    if(event_target){
        if(event_target instanceof HTMLElement){
            const target_text = (event_target as HTMLElement).textContent;
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
    }
}

</script>



<template>
    <article class="about_aside">
        <h3 @click="handle_click($event.target)">GitHub</h3>
        <h3 @click="handle_click($event.target)">Portfolio</h3>
        <h3 @click="handle_click($event.target)">Front end code</h3>
        <h3 @click="handle_click($event.target)">Back end code</h3>
        <h3 @click="handle_click($event.target)">LinkedIn</h3>
    </article>
</template>

<style lang="scss" scoped>
.about_aside{
    display: flex;
    flex-wrap: wrap;
    justify-self: center;
    row-gap: 15px;
    column-gap: 15px;
    align-items: center;
    width: 80%;
    justify-content: space-evenly;
}
</style>