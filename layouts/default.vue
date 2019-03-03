<template>
  <div>
    <app-header></app-header>
    <nuxt />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    "app-header": Header
  }
};
</script>


<style lang="postcss">
#__layout {
  position: relative;
  overflow: hidden;
}

html {
  font-family: "Graphik Regular", "Helvetica", sans-serif;
  font-size: var(--font-base);
  letter-spacing: 0.5px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

@media (--mobile) {
  #__layout {
    overflow: hidden;
  }
}
</style>
