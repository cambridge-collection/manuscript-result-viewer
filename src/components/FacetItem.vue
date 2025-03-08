<script lang="ts" setup>
import { computed } from 'vue'
import escape from 'core-js/actual/regexp/escape'
import { _params_to_query_structure, cancel_link, _query_param_sort } from '@/lib/utils';

const props = defineProps({
  facet: { type: Object as () => { val: string; count: number }, required: true },
  param_name: { type: String, required: true },
  params: {type: Array as () => { key: string; value: string }[], required: true},
  current_selections: {type: Array as () => string[], required: true},
  subfacets: { type: Object, required: true },
  is_subgroup: { type: Boolean, required: true },
  show: {type: Boolean, required: true},
})

const mapped_param_name = computed<string>(() => {
  let result = props.param_name
  if (/f\d+-(year|year-month|year-month-day)$/.test(props.param_name)) {
    result = 'f1-date'
  }
  return result
})

const is_selected = computed<boolean>(() => {
  const value: string = props.facet.val
  return (props.current_selections.some(
      (e: string) => {
        const para_val: string = String(e).replaceAll(/^"(.+?)"$/g, '$1')
        const re = new RegExp("^"+ escape(value) +'::')

        return para_val == value || re.test(para_val)
      }
    ))
  })

const new_facet_params = computed<Record<string, string[]>>(() => {
  const param_array: { key: string; value: string }[] = [...props.params]
  param_array.push({key: props.param_name, value: props.facet.val})

  param_array.sort((a, b) => {
    // First compare by key
    const keyComparison = _query_param_sort(a.key).localeCompare(_query_param_sort(b.key));
    if (keyComparison !== 0) return keyComparison;

    // If keys are the same, compare by value
    return a.value.localeCompare(b.value);
  });

  const result: Record<string, string[]>  = _params_to_query_structure(param_array)
  result['page'] = ['1']
  return result
})

const subgroupName = computed(() => {
  let result = null
  switch (props.param_name) {
    case 'f1-year':
      result = 'f1-year-month'
      break
    case 'f1-year-month':
      result = 'f1-year-month-day'
      break
    default:
  }
  return result
})

const get_subgroup = computed(() => {
  const tidied_val = props.facet.val.replaceAll(/^"(.+?)"$/g, '')
  const val_pattern = new RegExp('^' + tidied_val + '::')
  let result = []
  if (subgroupName.value && subgroupName.value in props.subfacets) {
    result = props.subfacets[subgroupName.value].filter((subfacet: any) =>
      val_pattern.test(subfacet.val),
    )
  }
  return result
})

const name = computed(() => {
  let value = props.facet.val.split('::').slice(-1)[0]
  if (
    props.param_name == 'f1-year-month' &&
    /^(0[1-9]|1[0,1,2])$/.test(value)
  ) {
    const date = new Date(2009, parseInt(value) - 1, 10) // 2009-11-10
    value = date.toLocaleString('default', { month: 'long' })
  }
  return value
})

</script>

<template>
  <tr v-show="show">
    <td class="col2">
      <span v-if="is_selected">{{ name }}</span>
      <router-link :to="{ name: 'search', query: new_facet_params }" v-else>
        {{  name }}
      </router-link>
    </td>
    <td class="col3">
      <router-link
        :to="{ name: 'search', query: cancel_link(param_name, facet.val, params) }"
        v-if="is_selected"
      >
        <span class="material-icons">close</span>
      </router-link>
      <span v-else>({{ props.facet.count }})</span>
    </td>
  </tr>
  <tr v-if="is_selected && subgroupName">
    <td colspan="2">
      <div
        class="facetSubGroup"
        v-if="is_selected && subgroupName"
      >
        <table>
          <tbody>
            <facetItem
              v-for="sub in get_subgroup"
              :facet="sub"
              :param_name="subgroupName"
              :subfacets="subfacets"
              :show="show"
              :current_selections="current_selections"
              v-bind:params
              v-bind:is_subgroup="true"
              :key="JSON.stringify(sub)"
            />
          </tbody>
        </table>
      </div>
    </td>
  </tr>
</template>

<style scoped>

.facet table td {
  background-color: transparent;
  font-size: 1rem;
  line-height:1.4
}

.facet table td.col3 {
  text-align: right;
}

.facet table td a, .facet table td {
  color: #FFF;
}

.facet .material-icons {
  font-size: 1.15rem;
  font-weight:900;
  vertical-align: baseline;
}

.facet tbody {
  border-top: none !important;
}

.facet table {
  border: none !important;
  border-collapse: collapse;
}
.facet .facetGroup .facetSubGroup table {
  width: 100%;
  border-top: none;
}
.facet .facetGroup .facetSubGroup {
  padding-left: 1em;
}
</style>
