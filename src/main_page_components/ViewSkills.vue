<template>
    <h3 class="view_skills_tag" @click="send_input($event)" ref="skills">View Skills</h3>
</template>

<script setup>
import { onMounted } from 'vue';

const { handle_view } = defineProps(['handle_view']);
const send_input = (event) =>{
    const event_text = event.target.innerText;
    handle_view(event_text);
}

onMounted(()=>{
    let tag_element = document.querySelector('.view_skills_tag');
    setTimeout(()=>{
        if(tag_element !== null){
            tag_element.style.opacity = '1';
        }
    }, 100)
})
</script>
<style lang="scss" scoped>
h3{
    opacity: 0;
    transition: 0.3s ease-in-out;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7.5px;
    padding-right: 7.5px;
    border: solid var(--orange) 1px;
    border-radius: 10px;
    cursor: pointer;
}

@media only screen and (min-width: 770px){

}

@media only screen and (min-width: 1024px){

}
</style>
