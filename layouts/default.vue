<template>
  <div>
    <app-header></app-header>
    <nuxt />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    'app-header': Header
  }
}
</script>


<style lang="postcss">
html {
  font-family: 'Graphik Regular', 'Helvetica', sans-serif;
  font-size: var(--font-base);
  letter-spacing: 0.5px;
  padding: 0 var(--spacing-base);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
