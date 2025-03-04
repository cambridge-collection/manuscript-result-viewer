<script lang="ts" setup>
import { onMounted } from 'vue'
import VirtualKeyboard from './VirtualKeyboard.vue';

const props = defineProps({
  keyword: { type: String, required: true },
})

onMounted(() => {
  /*const plugin = document.createElement("script");
  plugin.setAttribute(
    "src",
    "/src/lib/virtual-keyboard/keyboard.js"
  );
  document.getElementById('bb').appendChild(plugin);*/

})

</script>

<template>
  <div class="campl-row campl-page-header">
    <div class="campl-wrap clearfix campl-page-sub-title campl-recessed-sub-title">
      <div class="campl-content-container">
        <form action="/search" method="get" accept-charset="UTF-8" class="global_search">
          <div class="form-text">
            <virtual-keyboard :placeholder="'Search manuscripts...'" :keyword="props.keyword" :name="'keyword'"/>
          </div>
<!--          <input placeholder="Search manuscripts..." type="text" name="keyword" :value="props.keyword" class="form-text"/>-->
          <input type="submit" value="Search" class="form-submit campl-btn campl-primary-cta"/>
          <div class="advanced-search">
            <div><a href="/advanced-search" class="campl-secondary-cta">advanced search ›</a></div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>

.global_search {display:flex; gap: 0.5rem;align-items: baseline;}

.form-text{flex:max-content}

.advanced-search {
  display: inline-block;
  padding-left: 1.5rem;}
.global_search input {margin-bottom:0}
.global_search .form-text {height: 2rem;}
</style>
