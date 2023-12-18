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
    width: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
    text-align: start;
    row-gap: 25px;
    padding-top: 10px;
    padding-bottom: 10px;
    
    >p{
        width: 90%;
    }
}
@media only screen and (min-width: 770px){
    .hero_about{
        width: 80%;
    >p{
        width: 80%;
    }
}
}

@media only screen and (min-width: 1024px){
    .hero_about{
        width: 70%;
    >p{
        width: 80%;
        
    }
}
}
</style>