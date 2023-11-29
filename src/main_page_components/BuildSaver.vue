<script setup>
</script>

<template>
    <div class="build_saver">
        <input type="text" placeholder="Enter build name.." ref="build_input">
        <h3 @click="submit_build">Submit</h3>
    </div>
</template>

<style lang="scss" scoped>
.build_saver{
    display: grid;
    align-items: center;
    justify-items: center;
    >input{
        text-align: center;
    }
    >h3{
        text-align: center;
    }
}
</style>