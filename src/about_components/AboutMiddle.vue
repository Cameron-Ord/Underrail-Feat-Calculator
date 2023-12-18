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
        width: 90%;

    
>p{
    width: 80%;
}
}
}
</style>