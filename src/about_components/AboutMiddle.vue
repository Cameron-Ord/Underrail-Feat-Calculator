<script setup>
</script>

<template>
    <div class="hero_about">
        <p>
            If you wish to save your builds, you can easily create an account by using the menu and going to the signup page.
            At this time, you will not require an email. This is just a personal decision for now, keep in mind, however: If you lose 
            your password you won't be able to recover it, as no emails have been provided and passwords are encrypted.
        </p>
        <p>
            You can view your own personal saved builds in the profile page once you've logged in, the most recently added builds can be found
            at the all builds section. This is updated in real time, and only shows the most recent 10 builds. Search functionality hasn't been added, but it will be.
        </p>
        <p>
            For the purpose of simplicity, the generator assumes you are max level, but you are not required to use all the stats and skill points.
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