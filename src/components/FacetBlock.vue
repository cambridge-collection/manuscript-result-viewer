<script lang="ts" setup>
import FacetItem from '../components/FacetItem.vue'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const props = defineProps({
  desired_facet: { type: String, required: true },
  facets: { type: Object, required: true },
  facet_key: { type: Object, required: true },
  query_params: { type: Object, required: true },
  q_params_tidied: { type: Object, required: true },
  router: { type: Object, required: true },
})

const is_expanded = ref(false)
const toggleText = ref(['arrow_right', 'arrow_drop_down'])

const fullPath = ref(route.fullPath)
const name = ref(
  props.facet_key[props.desired_facet].name.replace(/(^"|"$)/g, ''),
)

const target_facets = computed(() => {
  return props.facets[props.desired_facet]
})

const has_entries = computed(() => {
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

const is_expandible = computed(() => {
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
            :query_params="query_params"
            :subfacets="subfacets"
            v-bind:is_subgroup="false"
            v-bind:router="router"
            v-bind:q_params_tidied="props.q_params_tidied"
            :key="JSON.stringify(facet) + fullPath"
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
