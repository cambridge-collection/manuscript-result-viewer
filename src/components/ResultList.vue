<script lang="ts" setup>
import { inject, ref, computed, onBeforeMount } from 'vue'
import { useRouter, useRoute, stringifyQuery } from 'vue-router'
import ResultItem from '@/components/ResultItem.vue'
import FacetBlock from '@/components/FacetBlock.vue'
import SearchBar from '@/components/SearchBar.vue'
import NoResults from '@/components/NoResults.vue'
import 'vue-awesome-paginate/dist/style.css'
import { CSpinner } from '@coreui/vue'
import 'material-icons/iconfont/filled.css';

const router = useRouter()
const route = useRoute()
const api_url = inject('api_url')
const commits = ref(<any[]>[])
const facets = ref(<any>{})
const core = computed(() => {
  const tc = 'tc' in route.query && route.query['tc'] ? route.query['tc'] : ''
  return tc == 'pages' ? 'pages' : 'items'
})
const is_loading = ref(true)
const is_error = ref(<any>{'bool': false, message: ""})

// Add any other desired facets into this array
// They will be displayed in that order
const desired_facets: string[] = [
  'lang_sm',
  'ms_date_sm',
  'ms_datecert_s',
  'ms_origin_sm',
  'author_sm',
  'editor_sm',
  'wk_subjects_sm',
  'ms_materials_sm',
  'ms_decotype_sm',
  'ms_music_b',
  'ms_bindingdate_sm',
  'ms_digitized_s',
  'ms_repository_s',
  'ms_collection_s'
]

// Enter facet details here.
const facet_key:any = {
  'author_sm': { name: 'Author', count: 5 },
  'editor_sm': { name: 'Editor', count: 5 },
  'lang_sm': { name: 'Language', count: 5 },
  'ms_date_sm': { name: 'Century', count: 5 },
  'ms_datecert_s': { name: 'Date Certainty', count: 5 },
  'ms_origin_sm': { name: 'Origin', count: 5 },
  'wk_subjects_sm': { name: 'Subjects', count: 999 },
  'ms_materials_sm': { name: 'Materials', count: 5 },
  'ms_decotype_sm': { name: 'Decoration', count: 5 },
  'ms_music_b': { name: 'Musical Notation', count: 5 },
  'ms_bindingdate_sm': { name: 'Binding Century', count: 5 },
  'ms_digitized_s': { name: 'Digital Facsimile Online', count: 5 },
  'ms_repository_s': { name: 'Repository', count: 5 },
  'ms_collection_s': { name: 'Collection', count: 5 },
}

const advanced_params = [
  'text',
  'sectionType',
  'search-addressee',
  'search-author',
  'search-correspondent',
  'year',
  'month',
  'day',
  'year-max',
  'month-max',
  'day-max',
  'search-date-type',
  'exclude-widedate',
  'search-repository',
  'exclude-cancelled',
]

const items_per_page = 20

function get_current_page(): number {
  let result: number = 1
  if ('page' in route.query && /^\d+$/.test(String(route.query['page']))) {
    result = Number(route.query['page'])
  }
  return result
}

const currentPage = ref(get_current_page())
const total = ref(0)

const q_params_tidied = computed(() => {
  const result: any = {}
  for (const key in route.query) {
    if (
      !['start', 'page', 'tab', 'smode', 'text-exclude'].includes(key) &&
      route.query[key]
    ) {
      const new_key = key.replace(/^f\d+-/, 'f1-')
      result[new_key] = [
        route.query[key],
        new_key in result ? result[new_key] : []
      ].flat(Infinity)
    }
  }

  if ('sort' in result) {
    result['sort'] = result['sort'][0]
  }
  return result
})

const hidden_params = computed(() => {
  const o:any[] = []

  Object.keys(q_params_tidied.value).filter((k) => k !== 'sort').sort().forEach((key: string) => {
    [...q_params_tidied.value[key]].forEach((val: string) => {
      o.push({key: key, value: val})
    })
  })
  return o
})

const facets_key = computed(() => {
  return JSON.stringify({ ...q_params_tidied.value })
})

const fullpath_uriencoded = computed(() => {
  return encodeURIComponent(route.fullPath)
})

// Make params computed and make param strings an internal var
const param_strings: string[] = []
Object.keys(q_params_tidied.value).sort().forEach((key: string) => {
  [...q_params_tidied.value[key]].forEach((val: string) => {
    param_strings.push(key + '=' + encodeURI(val))
  })
});

const params = param_strings.join('&')

const keyword_values = computed(() => {
  let result = ''
  if ('keyword' in query_params.value) {
    result = query_params.value['keyword']['details']
      .map((e: any) => e.value)
      .join(' ')
  }
  return result
})

function get_fieldname(p: string) {
  let name: string
  if (p == 'q') {
    name = 'q' //keyword
  } else {
    name = p
  }
  return name
}

function remove_vals(
  selected_key: string,
  selected_value: string,
  key: string,
  val: string,
) {
  let matches = key == selected_key && val == selected_value
  if (/^f\d+-date$/.test(selected_key)) {
    const tidied_val = selected_value.replaceAll(/^"(.+?)"$/g, '$1')
    const val_pattern = new RegExp('^' + tidied_val + '::')
    matches =
      val == selected_value ||
      val_pattern.test(val.replaceAll(/^"(.+?)"$/g, '$1'))
  }
  return matches
}

function _query_param_sort(key: string) {
  // Sort facet params by facet title (if facet) or param name (if search term).
  // Search terms are prefixed with 000_ to ensure they come first in the search
  // terms display
  return (key in facet_key) ? facet_key[key].name : "000_"+key
}

function cancel_link(param_key: string, param_val: string) {
  const qpt: Record<string, unknown> = q_params_tidied.value
  const qs: Record<string, Array<string>> = {}
  if (Object.keys(qpt).length == 0) {
    qs['keyword']= []
  } else {
    for (const key in qpt) {
      qs[key] = []
      let vals: any[] = []
      if (Array.isArray(qpt[key])) {
        vals = vals.concat(qpt[key])
      } else {
        vals.push(qpt[key])
      }
      vals.forEach(function (val, index) {
        if (!(key == param_key && val.replace(/(^"|"$)/g,'') == param_val)) {
          qs[key].push(val)
        }
      })
    }

    // Add any relevant values for the current param that would NOT
    // be cancelled by current cancellation
    let vals: string[] = []
    if (Array.isArray(qs[param_key])) {
      vals = vals.concat(qs[param_key])
    } else if (typeof qs[param_key] == 'string') {
      vals.push(qs[param_key])
    }
    const new_vals = []
    for (const val of vals) {
      if (!remove_vals(param_key, param_val, param_key, val)) {
        new_vals.push(val)
      }
    }
    qs[param_key] = new_vals
  }
  return {...qs, 'page': 1}
}


// Final query param string
const query_params: any = computed(() => {
  const p: any = {}
  Object.keys(q_params_tidied.value).sort((a, b) => (_query_param_sort(a)).localeCompare(_query_param_sort(b))).forEach((key) => {
    const value = q_params_tidied.value[key]

    p[key] = {
      fieldname: get_fieldname(key),
    }
    const details: any[] = []
    let detail: any = {}
    let vals: string[] = []

    if (Array.isArray(value)) {
      vals = vals.concat(value)
    } else {
      vals.push(value)
    }
    vals.sort().forEach(function (val, index) {
      detail = {
        value: val
      }
      details.push(detail)
    })
    p[key]['details'] = details
  })
  console.log(p)
  return p
})


function is_empty(obj: any) {
  let result: boolean = true;
  if (Object.keys(obj).length === 0) {
    result = true;
  } else {
    result =  Object.values(obj).every((entry:any) =>
      !entry.details || (Array.isArray(entry.details) && entry.details.length === 0)
    );
  }
  return result
}

const sort = computed(() => {
  return 'sort' in route.query ? route.query['sort'] : 'score'
})

const sp = { ...query_params.value }
delete sp['sort']
delete sp['tc']

const advanced_query_string = computed(() => {
  const params: any = {}
  advanced_params.forEach(p => {
    if (p in q_params_tidied.value && q_params_tidied.value[p]) {
      params[p] = q_params_tidied.value[p]
    }
  })

  return stringifyQuery(params)
})

function get_facet_header(str: string) {
  let result: string = str
  if (str in facet_key ) {
    result = facet_key[str]['name']
  }
  return result
}

const paginate_results = computed(() => total.value >= items_per_page )

function throw_error(error: any) {
  is_error.value['bool'] = true
  is_error.value['message'] = error
  is_loading.value = false
  console.log(error)
}

const updateURL = async (page: number): Promise<void> => {
  console.log('Moving to page ' + page)

  await router.push({
    name: 'search',
    query: { ...route.query, page: page },
  })
}

async function fetchData(start: number) {
  console.log(params)
  commits.value = []
  const control_params = []
  if (start) {
    control_params.push('page=' + start)
  }
  if (sort.value) {
    control_params.push('sort=' + sort.value)
  }

  const url = api_url + '/' + core.value + '?' + params + '&' + control_params.join('&')
  console.log("Trying " + url)
  const nq = await fetch(url, {
    method: 'get',
    mode: 'cors',
    credentials: 'include'})
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Invalid response')
    })
    .then(responseJson => {
      console.log(responseJson)
      for (let i = 0; i < responseJson['response']['docs'].length; i++) {
        const id = responseJson['response']['docs'][i].id
        let highlights = []
        if ('highlights' in responseJson) {
        highlights =
          id in responseJson['highlighting']
            ? responseJson['highlighting'][id]
            : { _text_: [] }
        responseJson['response']['docs'][i]['highlighting'] = [
          ...new Set(
            Object.values(highlights)
              .flat(1)
              .filter(n => n),
          ),
        ] }
      }
      return responseJson
    })
    .catch(error => {
      throw_error(error)
    })
  if (!is_error.value['bool'] && nq['response']) {
  commits.value = nq['response']['docs']
  total.value = nq['response']['numFound']
  const facets_cleaned: any = {}
  for (const key of desired_facets) {
    const facet_details = Object.entries(
      nq['facet_counts']['facet_fields'],
    ) as [string, Array<unknown>][]
    for (const [facet_name, facet_pairs] of facet_details) {
      facets.value[facet_name] = { buckets: [] }
      const buckets = []
      for (let i = 0; i < facet_pairs.length; i += 2) {
        const pair = facet_pairs.slice(i, i + 2)
        buckets.push({ val: pair[0], count: pair[1] })
      }
      facets_cleaned[facet_name] = buckets
    }
  }
  facets.value = facets_cleaned
}
  else {
    // The fetch result wasn't json with a 'response' property
    const msg = (is_error.value['message']) ? is_error.value['message'] : 'Error: Invalid response data'
    throw_error(msg)
  }
}

onBeforeMount(async () => {
  //console.log('Before')
  window.scrollTo(0, 0)
  await fetchData(currentPage.value).then(() => {
    is_loading.value = false
  })
})
</script>

<template>
  <search-bar :keyword="keyword_values"/>

  <div class="campl-row campl-content campl-recessed-content">
    <div class="campl-wrap clearfix">
      <div :class="['campl-column3 campl-secondary-content', (total > 0).toString()].join(' ')" id="page-secondary">
        <div class="region-sidebar">
          <div class="cudl-results sidebar-results-list">
            <facet-block
              v-for="facet in desired_facets"
              :desired_facet="facet"
              :params="params"
              v-bind:facets="facets"
              v-bind:facet_key="facet_key"
              v-bind:query_params="query_params"
              v-bind:router="router"
              v-bind:q_params_tidied="q_params_tidied"
              :key="facets_key + '::' + facet"
            />
          </div>
        </div>
      </div>
      <div
        class="campl-column9 campl-main-content"
        id="page-content"
        style="min-height: 100vh"
      >
        <div class="region region-content">
          <div
            id="block-darwin-sharing-darwin-sharing-add"
            class="block block-darwin-sharing campl-content-container"
          >
            <div>
              <div class="social-media-share">
                <a
                  class="icon-sm darwin-facebook"
                  :href="
                    'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.darwinproject.ac.uk' +
                    fullpath_uriencoded
                  "
                  title="Share on Facebook"
                  target="_blank"
                  ><i class="fab fa-facebook-f" aria-hidden="true"></i
                ></a>
                <a
                  class="icon-sm darwin-twitter"
                  :href="
                    'https://twitter.com/intent/tweet?text=Search+results&amp;url=https%3A%2F%2Fwww.darwinproject.ac.uk' +
                    fullpath_uriencoded
                  "
                  title="Share on Twitter"
                  target="_blank"
                  ><i class="fab fa-twitter" aria-hidden="true"></i
                ></a>
                <a
                  class="icon-sm darwin-email"
                  :href="
                    'mailto:?&amp;subject=Search results&amp;body=https%3A%2F%2Fwww.darwinproject.ac.uk' +
                    fullpath_uriencoded
                  "
                  title="Share by email"
                  ><i class="fas fa-envelope" aria-hidden="true"></i
                ></a>
              </div>
            </div>
          </div>
          <div id="block-system-main" class="block block-system">
            <div class="darwin-search-results" v-show="is_loading">
              <CSpinner />
            </div>
            <div class="darwin-search-results" v-if="is_error['bool']">
              <p>I'm sorry, I'm unable to complete your request ({{is_error['message']}})</p>
              <p>Please try again in a few minutes</p>
            </div>
            <div v-show="!is_loading && !is_error['bool']">
              <div class="campl-content-container" :key="route.fullPath">
                <div class="darwin-search-results-container">
                  <div class="search-results-page">
                    <div class="darwin-search-results">
                      <div
                        class="cudl-results search-results-list"
                        style="display: block"
                      >
                        <div class="resultsHeader" :key="JSON.stringify(sp)">
                          <div class="subQuery" v-if="!is_empty(sp)">
                              <span class="search-limit"
                                v-for="(obj, key) in sp"
                                :key="JSON.stringify(obj)"
                              >
                                <span
                                  class="option"
                                  v-for="o in obj['details']"
                                  :key="JSON.stringify(o)"
                                >
                                  <span class="fieldname">{{ get_facet_header(obj.fieldname) }}</span>
                                  <span class="subhit">{{ o.value }}</span>
                                  <span>
                                    <router-link :to="{ name: 'search', query: cancel_link(obj.fieldname, o.value)}">
                                      <span class="material-icons">close</span>
                                    </router-link>
                                    </span>
                                </span>
                              </span>
                              <p
                                class="modify_advanced"
                                v-if="advanced_query_string.length > 0"
                              >
                                <a
                                  :href="
                                    '/advanced-search?' + advanced_query_string
                                  "
                                  >Modify search</a
                                >
                              </p>
                            </div>
                          <div class="sort_by" v-if="total >= 1">
                              <span class="num_items" v-show="total >= 1">
                              <b>{{ total }}</b> item{{
                                  total != 1 ? 's' : ''
                                }}
                              <span v-if="Object.keys(sp).length > 0">found</span>
                              <span v-else>found:</span>
                            </span>
                              <form method="get" action="/search">
                                <b>Sorted by:&nbsp;</b>
                                <span class="campl-controls">
                                  <select size="1" name="sort">
                                    <option value="score" :selected="sort == 'score'">relevance</option>
                                    <option value="title" :selected="sort == 'title'">title</option>
                                  </select>
                                </span>
                                <input
                                  v-for="obj in hidden_params"
                                  type="hidden"
                                  :name="String(obj.key)"
                                  :value="obj.value"
                                  :key="obj.key + obj.value"
                                />
                                &nbsp;<input type="submit" class="campl-btn" value="Go!" />
                              </form>
                            </div>
                          <div :class="'pages ' + paginate_results" v-if="total >= 1">
                              <vue-awesome-paginate
                                :totalItems="total"
                                :itemsPerPage="items_per_page"
                                :maxPagesShown="5"
                                v-model="currentPage"
                                @click="updateURL"
                                type="link"
                                :linkUrl="'/search?page=[page]&' + params"
                              />
                            </div>
                          <NoResults :keyword="keyword_values" v-else-if="total === 0" />
                        </div>
                        <ResultItem
                          v-for="(item, index) in commits"
                          :item="item"
                          :currentPage="currentPage"
                          :index="index"
                          :key="item.id"
                        />
                        <div :class="'pages ' + paginate_results" v-if="total >= 1">
                          <vue-awesome-paginate
                            :totalItems="total"
                            :itemsPerPage="items_per_page"
                            :maxPagesShown="5"
                            v-model="currentPage"
                            @click="updateURL"
                            type="link"
                            :linkUrl="'/search?page=[page]&' + params"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
}

.social-media-share a {
  color: white;
  display: inline-block;
}

.social-media-share a svg {
  color: white;
  vertical-align: text-top;
}

.campl-secondary-content {
  background: #003e74;
}

#block-darwin-sharing-darwin-sharing-add {display:none}

em.match {
  color: rgb(42, 127, 189);
  font-weight: bold;
  font-style: inherit;
}


.search-results-page .search-result-item .snippets li {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

.search-results-page .search-result-item .main-icon {
  line-height: 1.75;
}

span.doubleUnderline,
div.doubleUnderline {
  font-weight: normal;
  text-decoration-line: underline;
  text-decoration-style: double;
}

div#page-secondary.false {
  display: none;
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}
.pagination-container li {line-height: 1.5rem;font-size: 0.8rem;}
ul#componentContainer .paginate-buttons {
  font-weight:normal;
  padding: 0.625em 1em;
  line-height: 1.5em;
  text-decoration: none;
  border: 1px solid #d6d6d6;
  margin: 0 .18em;
  color: #171717;
  background:none;
}

ul#componentContainer .paginate-buttons:hover {
  background-color: rgb(254, 254, 254);
  border: 1px solid rgb(200, 200, 200);
}

ul#componentContainer .paginate-buttons.active-page {
  cursor: default;
  font-weight: bold;
  background-color: #f2f2f2;
  color: #000000;
}

ul#componentContainer .paginate-buttons.next-button, ul#componentContainer .paginate-buttons.back-button {
  background: #000;
  color: rgb(254, 254, 254);
}

.search-results-page .pages {
  margin: 1em 0;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.search-results-page .pages a {
  margin: 0 5px 0 5px;
  padding: 2px 10px;
  background-color: #f8f8f8;
  border: 1px solid #eee;
}

.pages ul#componentContainer {
  margin-left: 0;
}

ul#componentContainer a.active-page,
ul#componentContainer a.active-page:hover {
  cursor: default;
  background: rgb(254, 254, 254);
  border-color: rgb(200, 200, 200);
}

.num_items {margin-bottom:1rem;}

.sort_by {
  margin: 2rem 0;
    display: flex ;
    justify-content: space-between;
}
div.option {padding-top:0.3rem;}

.subQuery {background: #f2f2f2;
  padding: 1.5rem 1rem;
border: 1px solid #d6d6d6;
display:flex;
gap:1rem;
  flex-wrap: wrap;
}

.subQuery a {
  display: inline-block;
  margin-left: 0.5rem
}

.subQuery a .material-icons {
  display: inline-block;
  vertical-align: text-bottom;
  font-size: 1.25rem;
  color: #171717;
}

.search-limit {display:flex; gap: 1rem; flex-wrap: wrap;}

.subQuery .option {
  font-weight: normal;
  padding: 0.5em;
  line-height: 1;
  text-decoration: none;
  border: 1px solid #d6d6d6;
  margin: 0 .18em;
  color: #171717;
  background: none;
  width: fit-content;
  background: #fff;
}

.search-limit span.option >span {
  display: inline;
  vertical-align: baseline;
}

.search-limit .fieldname {
  padding-right: 0.25rem;
  margin-right:0.25rem;
  border-right: 1px solid #d6d6d6;
  font-variant: all-petite-caps;
  font-weight: 600;
  font-size: 1.25rem;
}

.resultsHeader .query {
  margin-bottom: 1.5em;
}

.campl-column3.campl-secondary-content {
  display: block;
  position: relative !important;
}

#page-content .modify_advanced a,
#page-content .modify_advanced a:visited {
  color: #fff;
  background-color: #4b701c;
  padding: 3px 12px;
  border-radius: 24px;
  margin-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.27) 1px 1px 5px;
}


/* CSS for spinner from coreui - https://github.com/coreui/coreui.
   It's compatible bootstrap 5 and loading up the full CSS disrupts the current
   fragile CSS. Once migration to bootstrap is complete, the main css file can
   be used, which will be a more robust solution.
 */

.visually-hidden,
.visually-hidden-focusable:not(:focus):not(:focus-within) {
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
.visually-hidden:not(caption),
.visually-hidden-focusable:not(:focus):not(:focus-within):not(caption) {
  position: absolute !important;
}

.spinner-grow,
.spinner-border {
  display: inline-block;
  width: var(--cui-spinner-width);
  height: var(--cui-spinner-height);
  vertical-align: var(--cui-spinner-vertical-align);
  border-radius: 50%;
  animation: var(--cui-spinner-animation-speed) linear infinite
  var(--cui-spinner-animation-name);
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg) /* rtl:ignore */;
  }
}
.spinner-border {
  --cui-spinner-width: 2rem;
  --cui-spinner-height: 2rem;
  --cui-spinner-vertical-align: -0.125em;
  --cui-spinner-border-width: 0.25em;
  --cui-spinner-animation-speed: 0.75s;
  --cui-spinner-animation-name: spinner-border;
  border: var(--cui-spinner-border-width) solid currentcolor;
  border-right-color: transparent;
}

.spinner-border-sm {
  --cui-spinner-width: 1rem;
  --cui-spinner-height: 1rem;
  --cui-spinner-border-width: 0.2em;
}

@keyframes spinner-grow {
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: none;
  }
}
.spinner-grow {
  --cui-spinner-width: 2rem;
  --cui-spinner-height: 2rem;
  --cui-spinner-vertical-align: -0.125em;
  --cui-spinner-animation-speed: 0.75s;
  --cui-spinner-animation-name: spinner-grow;
  background-color: currentcolor;
  opacity: 0;
}

.spinner-grow-sm {
  --cui-spinner-width: 1rem;
  --cui-spinner-height: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .spinner-border,
  .spinner-grow {
    --cui-spinner-animation-speed: 1.5s;
  }
}

.spinner-border {
  margin: 5em auto 0 auto;
  text-align: center;
  display: block;
}

div.pages.false .pagination-container li:has(a.back-button),
div.pages.false .pagination-container li:has(a.next-button) {
  display: none;
}
div.pages.false .pagination-container li:has(a.number-buttons) {
  display: inherit;
}

@media (max-width: 767px) {
  li:has(a.paginate-buttons.number-buttons) {
    display: none;
  }
  #page-content li:has(a.paginate-buttons.number-buttons.active-page) {
    display: inherit;
  }

  /*  li:has(a.paginate-buttons.number-buttons):nth-last-child(2), li:has(a.paginate-buttons.number-buttons):nth-child(2) {
    display: inherit;
  }*/

  ul#componentContainer .paginate-buttons {
    font-size: 0.7em;
    height: 1.5em;
    width: 1.5em;
    border-radius: 6px;
    cursor: pointer;
    background-color: rgb(240, 240, 240);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }

  #page-content .search-results-page .pages a {
    margin: 0 4px 0 4px;
    padding: 2px 7px;
    background-color: #f8f8f8;
    border: 1px solid #eee;
  }
}
</style>
