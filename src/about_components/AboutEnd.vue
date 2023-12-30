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
