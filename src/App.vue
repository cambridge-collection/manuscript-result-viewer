<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView, stringifyQuery } from 'vue-router'
import DefaultLayout from './layout/defaultLayout.vue'

const route = useRoute()
const layout = computed(() => {
  return route.meta.layout || DefaultLayout
  }
)
</script>

<template>
  <!--  :key="stringifyQuery($route.query)"  -->
  <component :is="layout">
    <RouterView :key="stringifyQuery($route.query)"/>
  </component>
</template>
