<template>
    <h2 class="build_type_header_text">Build type filtering</h2>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(()=>{
    let build_type_header_text = document.querySelector('.build_type_header_text');
    setTimeout(()=>{
        if(build_type_header_text !== null){
            build_type_header_text.style.opacity = '1'
        }
    },100)
})
</script>

<style lang="scss" scoped>
    .build_type_header_text{
        opacity: 0;
        transition: 0.3s ease-in-out;
        text-align: center;
    }

</style>
