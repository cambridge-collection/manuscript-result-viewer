<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { CSpinner } from '@coreui/vue'
import { _tracer_bullet } from '@/lib/utils'
import * as implementation from '@/implementationConfig'

type FacetEntry = { val: string; count: number }

const repositories = ref<FacetEntry[]>([])
const collections = ref<FacetEntry[]>([])
const is_loading = ref<boolean>(true)
const is_error = ref<{ bool: boolean; message: string }>({ bool: false, message: '' })

// Solr facets arrive as a flat alternating [value, count, value, count, ...] array
function parse_facet(facet_fields: Record<string, (string | number)[]>, key: string): FacetEntry[] {
  return (facet_fields[key] ?? []).reduce(
    (acc: FacetEntry[], val, idx, arr) =>
      idx % 2 === 0 ? [...acc, { val: val as string, count: arr[idx + 1] as number }] : acc,
    []
  )
}

onMounted(async () => {
  window.scrollTo(0, 0)
  const url = implementation.api_url + '/items?type=manuscript&rows=0'
  _tracer_bullet('Trying ' + url)

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Invalid response')
    }

    const data = await response.json()
    _tracer_bullet(data)

    const facet_fields = (data.facet_counts?.facet_fields ?? {}) as Record<string, (string | number)[]>
    repositories.value = parse_facet(facet_fields, 'facet-repository')
    collections.value = parse_facet(facet_fields, 'facet-collection')
  } catch (error) {
    is_error.value = { bool: true, message: error instanceof Error ? error.message : String(error) }
    console.log(error)
  } finally {
    is_loading.value = false
  }
})
</script>

<template>
  <div class="campl-row campl-content campl-recessed-content">
    <div class="campl-wrap clearfix">
      <div id="block-system-main" class="block block-system">
        <div class="campl-content-container">
          <div v-show="is_loading">
            <CSpinner />
          </div>
          <div v-if="is_error.bool">
            <p>I'm sorry, I'm unable to complete your request ({{ is_error.message }})</p>
            <p>Please try again in a few minutes</p>
          </div>
          <div v-show="!is_loading && !is_error.bool">
            <section class="browse-section" v-if="repositories.length > 0">
              <h2>Repositories</h2>
              <ul class="browse-buttons campl-unstyled-list">
                <li v-for="repository in repositories" :key="repository.val">
                  <router-link
                    :to="{
                      name: 'search',
                      query: { type: 'manuscript', ms_repository_s: repository.val, page: '1' },
                    }"
                  >
                    {{ repository.val }}
                  </router-link>
                </li>
              </ul>
            </section>
            <section class="browse-section" v-if="collections.length > 0">
              <h2>Collections</h2>
              <ul class="browse-buttons campl-unstyled-list">
                <li v-for="collection in collections" :key="collection.val">
                  <router-link
                    :to="{
                      name: 'search',
                      query: { type: 'manuscript', ms_collection_s: collection.val, page: '1' },
                    }"
                  >
                    {{ collection.val }}
                  </router-link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.browse-section {
  margin-bottom: 4rem;
}

.browse-section h2 {
  color: #000;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.browse-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-left: 0;
  padding-left: 0;
}

.browse-buttons li {
  list-style: none;
  display: flex; /* let the anchor stretch to fill the grid cell's height */
}

.browse-buttons a {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0.625em 1em;
  line-height: 1.5em;
  text-decoration: none;
  border: 1px solid #d6d6d6;
  color: #003e74;
  background: #f8f8f8;
  font-weight: 600;
}

@media (max-width: 900px) {
  .browse-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .browse-buttons {
    grid-template-columns: 1fr;
  }
}

.browse-buttons a:hover,
.browse-buttons a:focus {
  background: #003e74;
  color: #fff;
  border-color: #003e74;
}
</style>
