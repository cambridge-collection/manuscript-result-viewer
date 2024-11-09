<script setup lang="ts">
</script>
<template>
  <div class="campl-row campl-content campl-recessed-content">
    <div class="campl-wrap clearfix">
      <div id="block-system-main" class="block block-system">
        <div id="advanced_search" class="campl-content-container">
          <h1>Advanced Search</h1>
          <form action="/search" method="get" accept-charset="UTF-8">
            <div class="form-group advanced-search-field">
              <label class="col-sm-3 control-label" for="ms_title_t">Title</label>
              <div class="col-sm-9">
                <input type="text" name="ms_title_t" id="ms_title_t" class="form-control">
              </div>
            </div>
            <div class="form-group advanced-search-field">
              <label class="col-sm-3 control-label" for="name_t">People</label>
              <div class="col-sm-9">
                <input type="text" name="name_t" id="name_t" class="form-control">
              </div>
            </div>
            <input type="submit" class="form-submit campl-btn campl-primary-cta" value="Search">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#block-system-main {line-height:1.5}
</style>
