
<script setup lang="ts">
import StatContainer from '../components/StatContainer.vue';
import SkillContainer from '../components/SkillContainer.vue';
import BuildTypes from '../components/BuildTypes.vue';
import GenerateBuild from '../components/GenerateBuild.vue';
import FeatContainer from '../components/FeatContainer.vue';
import AboutSection from '../about/AboutSection.vue';
import AllBuilds from '@/userbuilds/AllBuilds.vue';
</script>


<template>
    <main class="page_main">
        <section class="build_info_section">
            <stat-container></stat-container>
            <skill-container></skill-container>
        </section>
        <section class="optional_pre_selectors">
            <build-types></build-types>
        </section>
        <section class="generate_section">
            <generate-build></generate-build>
        </section>
        <section class="feat_container">
            <feat-container></feat-container>
        </section>
        <section class="user_builds">
            <all-builds></all-builds>
        </section>
        <section class="about_section">
            <about-section></about-section>
        </section>
    </main>
</template>

<style lang="scss" scoped>

</style>