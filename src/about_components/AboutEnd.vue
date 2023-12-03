<script setup>

</script>

<template>
    <div class="hero_about">
        <p>
            If you wish to view the source code for this project, links are provided at the bottom of the page,
            along with my contact information if you with to get in touch!
        </p>
        <p>
            Thanks for checking my project out! I hope you enjoy it. -Cameron
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
    >p{
        width: 90%;
        text-shadow: 2px 2px 4px rgba(226, 113, 0, 0.20);
    }
}
</style>