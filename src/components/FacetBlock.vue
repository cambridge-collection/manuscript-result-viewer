<script lang="ts" setup>
import FacetItem from '../components/FacetItem.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  desired_facet: { type: String, required: true },
  facets: { type: Object, required: true },
  facet_key: { type: Object, required: true },
  params: {type: Array as () => { key: string; value: string }[], required: true},
})

const is_expanded = ref<boolean>(false);
const toggleText = ref<Array<'arrow_right' | 'arrow_drop_down'>>(['arrow_right', 'arrow_drop_down'])

const name = ref<string>(
  props.facet_key[props.desired_facet].name.replace(/(^"|"$)/g, ''),
)

const target_facets = computed<{ val: string; count: number; }[]>(() => {
  return props.facets[props.desired_facet]
})

const has_entries = computed<boolean>(() => {
  return (
    props.desired_facet in props.facets &&
    props.facets[props.desired_facet].length > 0
  )
})

const subfacets = computed(() => {
  return {
    'f1-year-month': props.facets['f1-year-month'],
    'f1-year-month-day': props.facets['f1-year-month-day'],
  }
})

const is_expandible = computed<boolean>(() => {
  return [
    'author',
    'editor',
    'language',
    'century',
    'date certainty',
    'origin',
    'subjects',
    'materials',
    'decoration',
    'musical notation',
    'binding century',
    'digital facsimile online',
    'repository',
    'collection',
  ].includes(name.value.toLowerCase())
})

const current_facet_selections = computed<string[]>(() => props.params
  .filter((item: { key: string; value: string }) => item.key === props.desired_facet)
  .map((item: { key: string; value: string }) => item.value))
</script>

<template>
  <div class="facet" v-if="has_entries">
    <h3 class="facetName" @click="() => (is_expanded = !is_expanded)">
      <span>{{ name }}</span>
      <div class="facetMore" v-if="is_expandible && target_facets.length >= 5">
        <span class="material-icons" v-text="toggleText[is_expanded ? 1 : 0]" />
      </div>
    </h3>
    <div class="facetGroup">
      <table>
        <tbody>
          <facetItem
            v-for="(facet, index) in target_facets"
            :facet="facet"
            :show="index <= 4 || is_expanded"
            :param_name="desired_facet"
            :params="params"
            :current_selections="current_facet_selections"
            :subfacets="subfacets"
            v-bind:is_subgroup="false"
            :key="JSON.stringify(facet)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.facetName,
.facetGroup {
  padding: 1rem;
}

.facet {
  margin: 0 0.25rem 2rem 0.25rem;
}

.facetName > span {
  font-variant: all-petite-caps;
}

.facetGroup {
  padding-top: 0;
}

.facet .facetName {
  font-weight: 400;
  background-color: transparent;
  color: #fff;
  padding-bottom: 0.5em;
  overflow: hidden;
  font-size: 1.5rem;
  margin-top: 0;
  border: 1px none white;
  border-style: solid none;
}

.facet:first-child .facetName {
  border-top: none;
}

.facet table {
  width: 100%;
  margin-bottom: 0.25rem;
  border-bottom: none;
}

.facet tbody {
  border-top: none !important;
}

.facet .facetSubGroup table {
  width: 90%;
  margin-left: 10%;
  border-top: none;
}

.facetMore {
  float: right;
}

.facetMore > span {
  font-size: 1.75rem;
  vertical-align: baseline;
}
</style>
