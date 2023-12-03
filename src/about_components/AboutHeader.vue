<script setup>

</script>

<template>
    <div class="hero_about">
        <p>
            Hello there, welcome to the Underrail Feat Generator! An application designed
            to make deciding on and learning about the feats you can for specific stat and skill 
            builds a little easier by generating a curated list of feats based off the stats and skills
            you provide.
        </p>
        <p>
            Getting started is pretty simple, just go to the home page and choose your stats and skills and hit generate feats!
        </p>
    </div>
</template>

<style lang="scss" scoped>
.hero_about{
    display: grid;
    align-items: center;
    justify-items: center;
    text-align: start;
    row-gap: 25px;
    padding-top: 25px;
    padding-bottom: 25px;
    border-top: solid var(--orange) 1px;
    border-bottom: solid var(--orange) 1px;
    box-shadow: 0 0 5px 2.5px rgba(226, 113, 0, 0.5);
    
    >p{
        width: 90%;
        text-shadow: 2px 2px 4px rgba(226, 113, 0, 0.20);
    }
}
</style>