<template>
  <div id="main">
    <the-header></the-header>
    <section>
      <div class="container">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader,
  }
}
</script>

<style lang="scss">
  @import "./scss/_site.scss";

  body {
    background-color: rgba(240, 213, 162, 0.2);
    color: #003f11 !important;
    padding-bottom: 30px;
  }
</style>