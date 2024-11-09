<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
  item: { type: Object, required: true },
  currentPage: { type: Number, required: true },
  index: { type: Number, required: true },
})

const show_snippets = ref(false)
</script>

<template>
  <div
    :id="'main_' + index"
    :class="
      item['facet-document-type'] + ' docHit search-result-item has-summary'
    "
  >
    <div>
      <h2 class="item-title">
        <a :href="'/catalog/' + item.root_filename_s">{{ item.title }}</a>
      </h2>
      <div class="table">
        <div class="row" v-if="item.ms_oldshelfmarks_smni">
          <div class="label">Former Shelfmark:</div>
          <div class="content">
            <div
              v-for="(old_shelfmark, index) in item.ms_oldshelfmarks_smni"
              :index="index"
              :key="JSON.stringify(old_shelfmark)"
            >
              {{ old_shelfmark }}
            </div>
          </div>
        </div>
        <div class="row" v-if="item.ms_summary_sm">
          <div class="label">Contents:</div>
          <div class="content">
            <div
              v-for="(summary_item, index) in item.ms_summary_sm"
              :index="index"
              :key="JSON.stringify(summary_item)"
            >
              {{ summary_item }}
            </div>
          </div>
        </div>
<!--        <div class="row" v-if="item.ms_materials_sm">
          <div class="label">Material:</div>
          <div class="content">
            <div
              v-for="(summary_item, index) in item.ms_materials_sm"
              :index="index"
              :key="JSON.stringify(summary_item)"
            >
              {{ summary_item }}
            </div>
          </div>
        </div>
        <div class="row" v-if="item.ms_decotype_sm">
          <div class="label">Decoration:</div>
          <div class="content">
            <div
              v-for="(summary_item, index) in item.ms_decotype_sm"
              :index="index"
              :key="JSON.stringify(summary_item)"
            >
              {{ summary_item }}
            </div>
          </div>
        </div>-->
      </div>
    </div>
    <div
      class="matches"
      v-if="'highlighting' in item && item.highlighting.length > 0"
    >
      <h3>
        {{ item.highlighting.length }}
        snippet{{ item.highlighting.length == 1 ? '' : 's' }}
      </h3>
      <div class="snippets">
        <ul>
          <TransitionGroup>
            <li
              :class="
                'snippet count' +
                (index + 1) +
                ' ' +
                (show_snippets || index <= 2)
              "
              v-show="index <= 2 || show_snippets"
              v-for="(snippet, index) in item.highlighting"
              v-html="
                '&#x02026;' +
                snippet
                  .replace(/(^[^<>]*>|<[^>]*$)/g, '')
                  .replace(
                    /(<(h\d|p|li|div|td)( [^>]+)*>|<\/(h\d|p|li|div|td)>)/g,
                    ' ',
                  )
                  .replace(/(<a [^>]+>|<\/a>)/g, '') +
                '&#x02026;'
              "
              :key="JSON.stringify(snippet)"
            />
          </TransitionGroup>
        </ul>
      </div>
      <button
        class="show-more-matches"
        @click="() => (show_snippets = !show_snippets)"
        v-if="item.highlighting.length > 3"
      >
        <span class="more" v-show="!show_snippets">More matches +</span>
        <span class="less" v-show="show_snippets">– Less</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.table {
  display: table;
}
.row {
  display: table-row;
}
.table > .row > .content,
.table > .row > .label {
  display: table-cell;
  padding-top: 0.5rem;
}
.table > .row > .label {
font-weight: 700;
  width: fit-content;
  white-space: nowrap;
  text-align:right;
  padding:0.5rem 0.75rem 0.25rem 0 ;
}

.table > .row > .content {
  width: 100%;
  line-height: 1.5;
}

.search-results-page .search-result-item .snippets {
  transition: none;
  overflow: auto;
}

.search-results-page .search-result-item .show-more-matches .less {
  display: block;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


.this-site-result-wrap {
  width: 70%;
  float: left;
}


.docHit {
  margin-bottom: 2rem;
  border-bottom: 1px #003e74 dotted;
  padding-top: 0.5rem;
  font-size: 1rem;
}



.docHit h2 {font-weight: 800;}
.docHit h2 a:link,
.docHit h2 a:visited,
.docHit h2 a:hover,
.docHit h2 a:focus,
.docHit h2 a:active {
  color: #003e74;
}

.docHit .table {
  font-size: 0.9rem;
  padding: 1rem 2rem 0 2rem;
  width: 100%;
}

.docHit label {font-weight:800}

</style>
