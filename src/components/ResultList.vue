<script lang="ts" setup>
import { inject, ref, computed, onBeforeMount } from 'vue';
import { useRouter, useRoute, stringifyQuery } from 'vue-router';
import ResultItem from '@/components/ResultItem.vue';
import FacetBlock from '@/components/FacetBlock.vue';
import SearchBar from '@/components/SearchBar.vue';
import NoResults from '@/components/NoResults.vue';
import 'vue-awesome-paginate/dist/style.css';
import { CSpinner } from '@coreui/vue';
import 'material-icons/iconfont/filled.css';
import { cancel_link, _get_first_value,_query_param_sort, _tracer_bullet } from '@/lib/utils';
import * as implementation from '@/implementationConfig'

const router = useRouter();
const route = useRoute();
/*const api_url = inject('api_url');*/

const commits = ref<Array<{ id: PropertyKey; [key: string]: unknown }>>([]);
const facets = ref<Record<string, unknown>>({});
const is_loading = ref<boolean>(true);
const is_error = ref<{ bool: boolean; message: string }>({ bool: false, message: "" });
const items_per_page = 20
const total = ref<number>(0);
const currentPage = ref<number>(get_current_page());

const core = computed<'pages' | 'items'>(() => _get_first_value(route.query?.tc ?? null) === 'pages' ? 'pages' : 'items' )
const sort = computed<'title' | 'score'>(() => _get_first_value(route.query?.sort ?? null) === 'title' ? 'title' : 'score' )

// Only used in social Media links that likely won't appear in finished site.
const fullpath_uriencoded = computed<string>(() => encodeURIComponent(route.fullPath) )

const paginate_results = computed<boolean>(() => total.value >= items_per_page )

function get_current_page(): number {
  return ('page' in route.query && /^\d+$/.test(String(route.query['page']))) ? Number(route.query['page']): 1;
}

const all_params = computed<Array<{ key: string; value: string }>>(() => {
  const excludeKeys: string[] = ['page']
  const result: { key: string; value: string }[] = []

  for (const [key, value] of Object.entries(route.query).filter(([key]) => !excludeKeys.includes(key))) {
    if (Array.isArray(value)) {
      const filteredValues = (value as string[]).filter(val => val.trim().length > 0);

      if (filteredValues.length > 0) {
        filteredValues.forEach(val => result.push({ key, value: val }));
      }
    } else if (typeof value === 'string' && value.trim().length > 0) {
      // If value is a non-empty string, create a single entry
      result.push({ key, value });
    }
  }

  // Sort by key, then by value
  result.sort((a, b) => {
    // First compare by key
    const keyComparison = _query_param_sort(a.key).localeCompare(_query_param_sort(b.key));
    if (keyComparison !== 0) return keyComparison;

    // If keys are the same, compare by value
    return a.value.localeCompare(b.value);
  });

  return result;
});

const filtering_params = computed<Array<{ key: string; value: string }>>(() => all_params.value.filter(item => !['sort'].includes(item.key)))

const filtering_params_string = computed<string>(() => {
  return JSON.stringify(filtering_params.value)
})

const all_params_uri = computed<string>(() =>{
  const result_array: string[] = []
  all_params.value.forEach((item: { key: string; value: string }) => {
    result_array.push(item.key + '=' + encodeURI(String(item.value)))
  })
  return result_array.join('&')
})

const keyword_string = computed<string>(() => {
  return all_params.value.filter(item => item.key === 'keyword')
      .map(item => item.value)
      .join(' ')
})

const advanced_query_string = computed<string>(() => {
  const result: Record<string, string[]> = {}
    all_params.value.filter(item => implementation.advanced_params.includes(item.key)).forEach((item) => {
      if (result[item.key]) {
        result[item.key].push(item.value);
      } else {
        result[item.key] = [item.value];
      }
    });

  return stringifyQuery(result)
})

function get_facet_header(str: string) {
  return (str in implementation.facet_key ) ? implementation.facet_key[str]['name']: str
}

function throw_error(error: string) {
  is_error.value['bool'] = true
  is_error.value['message'] = error
  is_loading.value = false
  console.log(error)
}

const updateURL = async (page: number): Promise<void> => {
  _tracer_bullet('Moving to page ' + page)

  await router.push({
    name: 'search',
    query: { ...route.query, page: page },
  })
}

async function fetchData(start: number) {
  commits.value = []
  const control_params = []
  if (start) {
    control_params.push('page=' + start)
  }

  const url = implementation.api_url + '/' + core.value + '?' + all_params_uri.value + '&' + control_params.join('&')
  _tracer_bullet("Trying " + url)

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Invalid response');
    }

    const data = await response.json();
    _tracer_bullet(data);

    // Handle highlighting if present
     if (data?.highlighting) {
      for (const doc of data.response.docs) {
        const id = doc.id;
        // Use below if not checking for existence of highlighting before iterating docs
        //const highlights = 'highlighting' in data? data.highlighting[id] : { _text_: [] };
        // Use below instead of above if checking for existence of highlighting before iterating docs
        const highlights = data.highlighting[id] ?? { _text_: [] };
        // Does this update data.response? It appears to.
        doc.highlighting = [
          ...new Set(Object.values(highlights).flat().filter(Boolean)),
        ];
      }
    }

    if (!is_error.value.bool) {
      commits.value = data.response.docs;
      total.value = data.response.numFound;

      // Clean and format facets
      const facetsCleaned: Record<string, unknown[]> = Object.fromEntries(
        implementation.desired_facets.map(key => [
          key,
          (data.facet_counts?.facet_fields?.[key] ?? []).reduce(
            (acc: unknown[], val: string, idx: number, arr: unknown[]) =>
              idx % 2 === 0 ? [...acc, { val, count: arr[idx + 1] }] : acc,
            []
          ),
        ])
      );

      facets.value = facetsCleaned;
    }
  } catch (error) {
    throw_error(error instanceof Error ? error.message : String(error));
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
  <search-bar :keyword="keyword_string" />

  <div class="campl-row campl-content campl-recessed-content">
    <div class="campl-wrap clearfix">
      <div
        :class="
          [
            'campl-column3 campl-secondary-content',
            (total > 0).toString(),
          ].join(' ')
        "
        id="page-secondary"
      >
        <div class="region-sidebar">
          <div class="cudl-results sidebar-results-list">
            <facet-block
              v-for="facet in implementation.desired_facets"
              :desired_facet="facet"
              :facets="facets"
              :facet_key="implementation.facet_key"
              :params="all_params"
              :key="filtering_params_string+'::'+facet"
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
              <p>
                I'm sorry, I'm unable to complete your request ({{
                  is_error['message']
                }})
              </p>
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
                        <div class="resultsHeader" :key="JSON.stringify(all_params)">
                          <div class="subQuery" v-if="filtering_params.length > 0">
                            <span
                              class="search-limit"
                              v-for="obj in filtering_params"
                              :key="JSON.stringify(obj)"
                            >
                              <span
                                class="option"
                                :key="JSON.stringify(obj)"
                              >
                                <span class="fieldname">{{
                                  get_facet_header(obj.key)
                                }}</span>
                                <span class="subhit">{{ obj.value }}</span>
                              <span>
                                  <router-link
                                    :to="{
                                      name: 'search',
                                      query: cancel_link(
                                        obj.key,
                                        obj.value,
                                        all_params
                                      ),
                                    }"
                                  >
                                    <span class="material-icons">close</span>
                                  </router-link>
                                </span>
                             </span>
                            </span>
                          </div>
                          <div class="sort_by" v-if="total >= 1">
                            <span class="num_items" v-show="total >= 1">
                              <b>{{ total }}</b> item{{ total != 1 ? 's' : '' }}
                              <!--<span v-if="Object.keys(sp).length > 0">found</span>-->
                              <span>found</span>
                            </span>
                            <form method="get" action="/search">
                              <b>Sorted by:&nbsp;</b>
                              <span class="campl-controls"
                                >
                                <select size="1" name="sort">
                                  <option
                                    value="score"
                                    :selected="sort == 'score'"
                                  >
                                    relevance
                                  </option>
                                  <option
                                    value="title"
                                    :selected="sort == 'title'"
                                  >
                                    title
                                  </option>
                                </select>
                              </span>
                              <input
                                v-for="obj in filtering_params"
                                type="hidden"
                                :name="String(obj.key)"
                                :value="obj.value"
                                :key="obj.key + obj.value"
                              />
                              &nbsp;<input
                                type="submit"
                                class="campl-btn"
                                value="Go!"
                              />
                            </form>
                          </div>
                          <div
                            :class="'pages ' + paginate_results"
                            v-if="total >= 1"
                          >
                            <vue-awesome-paginate
                              :totalItems="total"
                              :itemsPerPage="items_per_page"
                              :maxPagesShown="5"
                              v-model="currentPage"
                              @click="updateURL"
                              type="link"
                              :linkUrl="'/search?page=[page]&' + all_params_uri"
                            />
                          </div>
                          <NoResults
                            :keyword="keyword_string"
                            v-else-if="total === 0"
                          />
                        </div>
                        <ResultItem
                          v-for="(item, index) in commits"
                          :item="item"
                          :currentPage="currentPage"
                          :index="index"
                          :key="item.id"
                        />
                        <div
                          :class="'pages ' + paginate_results"
                          v-if="total >= 1"
                        >
                          <vue-awesome-paginate
                            :totalItems="total"
                            :itemsPerPage="items_per_page"
                            :maxPagesShown="5"
                            v-model="currentPage"
                            @click="updateURL"
                            type="link"
                            :linkUrl="'/search?page=[page]&' + all_params_uri"
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

#block-darwin-sharing-darwin-sharing-add {
  display: none;
}

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
.pagination-container li {
  line-height: 1.5rem;
  font-size: 0.8rem;
}
ul#componentContainer .paginate-buttons {
  font-weight: normal;
  padding: 0.625em 1em;
  line-height: 1.5em;
  text-decoration: none;
  border: 1px solid #d6d6d6;
  margin: 0 0.18em;
  color: #171717;
  background: none;
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

ul#componentContainer .paginate-buttons.next-button,
ul#componentContainer .paginate-buttons.back-button {
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

.num_items {
  margin-bottom: 1rem;
}

.sort_by {
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
}
div.option {
  padding-top: 0.3rem;
}

.subQuery {
  background: #f2f2f2;
  padding: 1.5rem 1rem;
  border: 1px solid #d6d6d6;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.subQuery a {
  display: inline-block;
  margin-left: 0.5rem;
}

.subQuery a .material-icons {
  display: inline-block;
  vertical-align: text-bottom;
  font-size: 1.25rem;
  color: #171717;
}

.search-limit {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.subQuery .option {
  font-weight: normal;
  padding: 0.5em;
  line-height: 1;
  text-decoration: none;
  border: 1px solid #d6d6d6;
  margin: 0 0.18em;
  color: #171717;
  background: none;
  width: fit-content;
  background: #fff;
}

.search-limit span.option > span {
  display: inline;
  vertical-align: baseline;
}

.search-limit .fieldname {
  padding-right: 0.25rem;
  margin-right: 0.25rem;
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
