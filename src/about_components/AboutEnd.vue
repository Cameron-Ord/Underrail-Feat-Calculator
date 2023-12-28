<script setup>

</script>

<template>
    <div class="hero_about">
        <p>
            If you wish to view the source code for this project, links are provided here,
            along with my contact information if you with to get in touch!
        </p>
        <p>
            Thanks for checking my project out! I hope you enjoy it. -Cameron
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
    transition: 0.3s ease-in-out;
    opacity: 0;
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
