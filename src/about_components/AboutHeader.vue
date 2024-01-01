<script setup>








</script>

<template>
    <div class="hero_about">
        <p>
            Hello there, welcome to the Underrail Feat Generator! An application designed
            to make deciding on and learning about the feats you can take for specific stat and skill 
            builds a little easier by generating a curated list of feats based off the stats and skills
            you provide. Basic controls are listed below.
        </p>

        <div class="crtl_tut_div">
            <h3>DESKTOP BUTTON CONTROLS:</h3>
            <div class="controls_tut">
                <h4>Click:</h4>
                <p>Add/Subtract 1 skill or stat points</p>
            </div>
            <div class="controls_tut">
                <h4>Shift-click:</h4>
                <p>Add/Subtract 5 skill or stat points</p>
            </div>
            <div class="controls_tut">
                <h4>Ctrl-click:</h4>
                <p>Add/Subtract 80 skill points or 10 stat points</p>
            </div>
        </div>
        <div class="crtl_tut_div">
            <h3>MOBILE BUTTON CONTROLS:</h3>
            <div class="controls_tut">
                <h4>Touchscreen:</h4>
                <p>Intervalically increase the stat or skill points by 1 every 0.15s while button is held down</p>
            </div>
        </div>
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
   

    >.crtl_tut_div{
        border-top: solid var(--orange) 1px;
        border-bottom: solid var(--orange) 1px;
        border-right: solid var(--orange) 1px;
        border-left: solid var(--orange) 1px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        justify-content: space-evenly;
        align-items: start;
        border-radius: 5px;
        padding-top: 10px;
        padding-right: 10px;
        padding-left: 10px;
        padding-bottom: 10px;
        >h3{
            
        }
        >.controls_tut{
            display: flex;
            column-gap: 10px;
            row-gap: 10px;
            flex-direction: column;
            justify-content: space-evenly;

            >h4{
                text-decoration: underline var(--orange) 1px;
            }
        }

    }
}
@media only screen and (min-width: 770px){
    .hero_about{
        width: 70%;
        >.crtl_tut_div{
            padding-top: 12.5px;
            padding-right: 12.5px;
            padding-left: 12.5px;
            padding-bottom: 12.5px;
        }
    }
}

@media only screen and (min-width: 1024px){
    .hero_about{
        width: 80%;
        >.crtl_tut_div{
            padding-top: 16.5px;
            padding-right: 16.5px;
            padding-left: 16.5px;
            padding-bottom: 16.5px;
        }
    }
}
</style>
