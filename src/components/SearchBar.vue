<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { _get_first_value } from '@/lib/utils';

const VirtualKeyboard = defineAsyncComponent(() =>
  import('./VirtualKeyboard.vue')
);

const props = defineProps({
  keyword: { type: String, required: true },
})

const route = useRoute()

const current_type = computed<string | null>(() => _get_first_value(route.query.type ?? null))

const type_placeholders: Record<string, string> = {
  manuscript: 'Search manuscripts...',
  person: 'Search people/organisations...',
  work: 'Search works...',
}

const placeholder = computed<string>(() =>
  (current_type.value && type_placeholders[current_type.value]) || 'Search manuscripts...'
)
</script>

<template>
  <div class="campl-row campl-page-header">
    <div class="campl-wrap clearfix campl-page-sub-title campl-recessed-sub-title">
      <div class="campl-content-container">
        <form action="/search" method="get" accept-charset="UTF-8" class="global_search">
          <div class="form-text">
            <virtual-keyboard :placeholder="placeholder" :keyword="props.keyword" :name="'keyword'"/>
          </div>
          <input v-if="current_type" type="hidden" name="type" :value="current_type"/>
          <input type="submit" value="Search" class="form-submit campl-btn campl-primary-cta"/>
          <div class="advanced-search">
            <div><router-link :to="{ name: 'advanced-search'}" class="campl-secondary-cta">advanced search ›</router-link></div>
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
