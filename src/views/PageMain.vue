
<script setup lang="ts">
import StatContainer from '@/components/StatContainer.vue';
import SkillContainer from '@/components/SkillContainer.vue';
import BuildTypes from '@/components/BuildTypes.vue';
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

        </section>
        <section class="user_builds">

        </section>
        <section class="saved_builds">

        </section>
        <section class="about_section">

        </section>
    </main>
</template>

<style lang="scss" scoped>

</style>