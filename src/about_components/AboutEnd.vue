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
@media only screen and (min-width: 770px){
    .hero_about{
        width: 80%;
        border-left: solid var(--orange) 1px;
        border-right: solid var(--orange) 1px;

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