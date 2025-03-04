<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  query_params: { type: Object, required: true },
})

const keyword = computed(() => {
  let result = null
  if ('keyword' in props.query_params) {
    result = props.query_params['keyword']['details']
      .map((e: Record<string, unknown>) => e.value)
      .join(' ')
  }
  return result
})

</script>

<template>

<!--  <div class="campl-row campl-page-header">
    <div class="campl-wrap clearfix campl-local-navigation" id="local-nav"><p class="campl-closed campl-menu-btn" id="menu-btn"><a href="#"><span>Menu</span> <span class="campl-menu-btn-arrow"></span></a></p>
      <div class="campl-local-navigation-container">
        <ul class="campl-unstyled-list campl-current">
          <li class="campl-top"><a href="#">About us</a></li>
          <li class="campl-top campl-sub"><a href="#" class="campl-selected" style="position: relative;">Prospective Students<span class="campl-menu-indicator campl-fwd-btn"></span></a>
            <ul class="campl-unstyled-list local-dropdown-menu"><li class="campl-back-link"><a href="#"><span class="campl-back-btn campl-menu-indicator"></span>Back to section home</a></li><li class="campl-title"><a href="#">Prospective Students</a></li>
              <li class=""><a href="#" style="position: relative;">Step 1 - Why Cambridge<span class="campl-menu-indicator campl-fwd-btn"></span></a>
                <ul class="campl-unstyled-list local-dropdown-menu"><li class="campl-back-link"><a href="#"><span class="campl-back-btn campl-menu-indicator"></span>Prospective Students</a></li><li class="campl-title"><a href="#">Step 1 - Why Cambridge</a></li>
                  <li><a href="#">The City</a></li>
                  <li><a href="#">The University</a></li>
                  <li><a href="#">Benefits of Studying at Cambridge</a></li>
                </ul>
              </li>
              <li class=""><a href="#" style="position: relative;">Step 2 - Studying at Cambridge<span class="campl-menu-indicator campl-fwd-btn"></span></a>
                <ul class="campl-unstyled-list local-dropdown-menu"><li class="campl-back-link"><a href="#"><span class="campl-back-btn campl-menu-indicator"></span>Prospective Students</a></li><li class="campl-title"><a href="#">Step 2 - Studying at Cambridge</a></li>
                  <li class="campl-active-page"><a href="#q">Course directory</a></li>
                  <li><a href="#">Modes of Study</a></li>
                  <li><a href="#">Fees and Costs</a></li>
                  <li><a href="#">Funding Your Studies</a></li>
                  <li><a href="#">Immigration</a></li>
                  <li><a href="#">Bringing your Family</a></li>
                  <li><a href="#">Accommodation</a></li>
                  <li><a href="#">The Colleges</a></li>
                  <li><a href="#">University Policy and Guidelines</a></li>
                </ul>
              </li>
              <li class=""><a href="#" style="position: relative;">Step 3 - How to apply<span class="campl-menu-indicator campl-fwd-btn"></span></a>
                <ul class="campl-unstyled-list local-dropdown-menu"><li class="campl-back-link"><a href="#"><span class="campl-back-btn campl-menu-indicator"></span>Prospective Students</a></li><li class="campl-title"><a href="#">Step 3 - How to apply</a></li>
                  <li><a href="#">Supporting Documentation</a></li>
                  <li><a href="#">Continuation and Readmission</a></li>
                  <li><a href="#">Your Self-Service Account</a></li>
                  <li><a href="#">Application and Funding Deadlines</a></li>
                  <li><a href="#">Application Fees</a></li>
                  <li><a href="#">College Choice</a></li>
                  <li><a href="#">Disabled Applicants</a></li>
                  <li><a href="#">Entrance Requirements</a></li>
                  <li><a href="#">Part-Time Study and Research</a></li>
                  <li><a href="#">Privacy - Your Personal Data</a></li>
                  <li><a href="#">Research Topic and Resources</a></li>
                  <li><a href="#">Staff Applicants</a></li>
                  <li><a href="#">Starting Dates</a></li>
                  <li><a href="#">Applying Paper</a></li>
                </ul>
              </li>
              <li class=""><a href="#" style="position: relative;">Step 4 - I've applied - What Next?<span class="campl-menu-indicator campl-fwd-btn"></span></a>
                <ul class="campl-unstyled-list local-dropdown-menu"><li class="campl-back-link"><a href="#"><span class="campl-back-btn campl-menu-indicator"></span>Prospective Students</a></li><li class="campl-title"><a href="#">Step 4 - I've applied - What Next?</a></li>
                  <li><a href="#">Status Of Your Application</a></li>
                  <li><a href="#">Conditions of Admission</a></li>
                  <li><a href="#">If Your Circumstances Change</a></li>
                  <li><a href="#">Confirmation of Admission</a></li>
                  <li><a href="#">Continuation</a></li>
                  <li><a href="#">Immigration</a></li>
                  <li><a href="#">Admissions Complaints</a></li>
                </ul>
              </li>
              <li class=""><a href="#" style="position: relative;">Frequently asked questions<span class="campl-menu-indicator campl-fwd-btn"></span></a>
                <ul class="campl-unstyled-list local-dropdown-menu"><li class="campl-back-link"><a href="#"><span class="campl-back-btn campl-menu-indicator"></span>Prospective Students</a></li><li class="campl-title"><a href="#">Frequently asked questions</a></li>
                  <li><a href="#">Prospective Graduate Students</a></li>
                  <li><a href="#">Referees</a></li>
                </ul>
              </li>
              <li><a href="#">Site map</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>-->

</template>
