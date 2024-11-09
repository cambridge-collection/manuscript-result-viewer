<script setup lang="ts">
import { RouterView, stringifyQuery } from 'vue-router'
</script>

<template>
  <!--  :key="stringifyQuery($route.query)"  -->
  <RouterView :key="stringifyQuery($route.query)"/>
</template>
