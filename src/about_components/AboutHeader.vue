<script setup>








</script>

<template>
    <div class="hero_about">
        <p>
            Hello there, welcome to the Underrail Feat Generator! An application designed
            to make deciding on and learning about the feats you can take for specific stat and skill 
            builds a little easier by generating a curated list of feats based off the stats and skills
            you provide.
        </p>
        <p>
            On desktop the controls for the buttons to add skill and stat points
            are click, shift-click, and crtl-click. On mobile, simply press and hold.
        </p>
    </div>
</template>

<style lang="scss" scoped>
.hero_about{
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    opacity: 0;
    text-align: start;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: 25px;
    transition: 0.3s ease-in-out;
}
@media only screen and (min-width: 770px){
    .hero_about{
        width: 70%;
    }
}

@media only screen and (min-width: 1024px){
    .hero_about{
        width: 60%;
    }
}
</style>
