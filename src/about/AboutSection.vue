<script setup lang="ts">

</script>

<template>
  <article class="about_article">
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
          <p>Intervalically increase stat points by 1 every 100ms or skill points by 1 every 10ms while the button is held
            down</p>
        </div>
      </div>
    </div>
    <div class="hero_about">
      <p>
        If you wish to save your builds, you can easily create an account by using the menu and going to the signup page.
        At this time, you will not require an email. This is just a personal decision for now, keep in mind, however: If
        you lose
        your password you won't be able to recover it, as no emails have been provided and passwords are encrypted.
      </p>
      <p>
        You can view your own personal saved builds in the profile page once you've logged in, the most recently added
        builds can be found
        at the all builds section. This is updated in real time, and only shows the most recent 10 builds. Search
        functionality hasn't been added, but it will be.
      </p>
      <p>
        For the purpose of simplicity, the generator assumes you are max level, but you are not required to use all the
        stats and skill points.
      </p>
    </div>
    <div class="hero_about">
      <p>
        If you wish to view the source code for this project, links are provided here,
        along with my contact information if you with to get in touch!
      </p>
      <p>
        Thanks for checking my project out! I hope you enjoy it. -Cameron
      </p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.about_article {
  display: grid;
  align-items: center;
  justify-items: center;
  row-gap: 25px;

  >.hero_about {
    text-align: start;
    row-gap: 15px;
    display: grid;
    width: 80%;

    >.crtl_tut_div {
      display: flex;
      align-items: start;
      flex-direction: column;
      row-gap: 10px;

      >.controls_tut {
        display: flex;
        align-items: start;
        flex-direction: column;
        row-gap: 10px;
      }
    }
  }
}



@media only screen and (min-width: 770px) {
  .about_article {
    >.hero_about {
      width: 70%;
    }
  }
}

@media only screen and (min-width: 1024px) {
  .about_article {
    >.hero_about {
      width: 80%;
    }
  }
}
</style>
