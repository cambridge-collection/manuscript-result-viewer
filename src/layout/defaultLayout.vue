<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import { _get_first_value } from '@/lib/utils'
import { show_homepage, show_works, show_people, show_places } from '@/featureFlags'

const route = useRoute()

// vue-router ignores the query string when deciding link activeness, so the
// /search nav links derive their own active state from the type filter.
const current_type = computed<string | null>(() => _get_first_value(route.query.type ?? null))

function nav_class(type: string | null): string {
  return route.path === '/search' && current_type.value === type ? 'campl-selected' : ''
}
</script>

<template>
  <div class="campl-row campl-global-header">
    <div class="campl-wrap clearfix">
      <div class="campl-header-container campl-column8" id="global-header-controls" style="display: block;"><a href="" class="campl-open-menu ir" id="open-menu">View menu</a>
        <a href="http://www.cam.ac.uk" class="campl-main-logo">
          <img alt="University of Cambridge" src="/src/images/interface/main-logo-small.svg" height="38">
        </a>
      </div>
    </div>
  </div>
  <div class="campl-row campl-page-header">
    <div class="campl-wrap clearfix">
      <div class="campl-column12">
        <div class="campl-content-container">
          <h1 class="campl-page-title">Medieval Manuscripts Catalogue</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="campl-row campl-page-header">
    <div class="campl-wrap clearfix campl-local-navigation" id="local-nav"><p class="campl-closed campl-menu-btn" id="menu-btn"><a href="#"><span>Menu</span> <span class="campl-menu-btn-arrow"></span></a></p>
      <div class="campl-local-navigation-container">
        <ul class="campl-unstyled-list campl-current">
          <li class="campl-top">
            <router-link v-if="show_homepage" to="/" :class="route.path === '/' ? 'campl-selected' : ''">Home</router-link>
            <router-link v-else :to="{ path: 'search', query: { sort: 'title' }}" :class="nav_class(null)">Home</router-link>
          </li>
          <li class="campl-top" v-if="show_homepage"><router-link :to="{ path: 'search', query: { sort: 'title', type: 'manuscript' }}" :class="nav_class('manuscript')">Manuscripts</router-link></li>
          <li class="campl-top" v-if="show_works"><router-link :to="{ path: 'search', query: { sort: 'title', type: 'work' }}" :class="nav_class('work')">Works</router-link></li>
          <li class="campl-top" v-if="show_people"><router-link :to="{ path: 'search', query: { sort: 'title', type: 'person' }}" :class="nav_class('person')">People</router-link></li>
          <li class="campl-top" v-if="show_places"><router-link :to="{ path: 'search', query: { sort: 'title', type: 'place' }}" :class="nav_class('place')">Places</router-link></li>
          <li class="campl-top"><router-link to="/about" active-class="campl-selected">About</router-link></li>
        </ul>
      </div>
    </div>
  </div>
  <search-bar :keyword="''" />
  <slot/>
  <div class="campl-row campl-local-footer">
    <div class="campl-wrap clearfix">
      <div class="campl-column12">
        <div class="campl-content-container">
          <p>Digital Initiatives <br/>Cambridge University Library, West Road, Cambridge CB3 9DR, UK</p>
          <p>Built using the <a href="https://cambridge-collection.github.io/">Cambridge Digital Collections Platform</a></p>
        </div>
      </div>
    </div>
    <div class="campl-row campl-global-footer">
      <div class="campl-wrap clearfix">
        <div class="campl-column3 campl-footer-navigation" style="height: 232px;">
          <div class="campl-content-container campl-footer-logo">
            <img alt="University of Cambridge" src="/src/images/interface/main-logo-small.png" class="campl-scale-with-grid">
            <p>© 2025 University of Cambridge</p>
            <ul class="campl-unstyled-list campl-global-footer-links">
              <li>
                <a href="https://www.cam.ac.uk/about-the-university/contact-the-university?ucam-ref=global-footer">Contact the University</a>
              </li>
              <li>
                <a href="https://www.cam.ac.uk/about-this-site/accessibility?ucam-ref=global-footer">Accessibility</a>
              </li>
              <li>
                <a href="https://www.information-compliance.admin.cam.ac.uk/foi?ucam-ref=global-footer">Freedom of information</a>
              </li>
              <li>
                <a href="https://www.cam.ac.uk/about-this-site/privacy-policy?ucam-ref=global-footer">Privacy policy and cookies</a>
              </li>
              <li>
                <a href="https://www.registrarysoffice.admin.cam.ac.uk/governance-and-strategy/anti-slavery-and-anti-trafficking?ucam-ref=global-footer">Statement on Modern Slavery</a>
              </li>
              <li>
                <a href="https://www.cam.ac.uk/about-this-site/terms-and-conditions?ucam-ref=global-footer">Terms and conditions</a>
              </li>
              <li>
                <a href="https://www.cam.ac.uk/university-a-z?ucam-ref=global-footer">University A-Z</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="campl-column3 campl-footer-navigation" style="height: 232px;">
          <div class="campl-content-container campl-navigation-list">

            <div class="link-list">
              <h3><a href="https://www.cam.ac.uk/study-at-cambridge?ucam-ref=global-footer">Study at Cambridge</a></h3>
              <ul class="campl-unstyled-list">
                <li>
                  <a href="https://www.undergraduate.study.cam.ac.uk/?ucam-ref=global-footer">Undergraduate</a>
                </li>
                <li>
                  <a href="https://www.postgraduate.study.cam.ac.uk?ucam-ref=global-footer">Postgraduate</a>
                </li>
                <li>
                  <a href="https://www.ice.cam.ac.uk/?ucam-ref=global-footer">Continuing education</a>
                </li>
                <li>
                  <a href="https://www.epe.admin.cam.ac.uk/?ucam-ref=global-footer">Executive and professional education</a>
                </li>
                <li>
                  <a href="https://www.educ.cam.ac.uk/?ucam-ref=global-footer">Courses in education</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="campl-column3 campl-footer-navigation" style="height: 232px;">
          <div class="campl-content-container campl-navigation-list">
            <h3><a href="https://www.cam.ac.uk/about-the-university?ucam-ref=global-footer">About the University</a></h3>
            <ul class="campl-unstyled-list campl-page-children">
              <li>
                <a href="https://www.cam.ac.uk/about-the-university/how-the-university-and-colleges-work?ucam-ref=global-footer">How the University
                  and Colleges work</a>
              </li>
              <li>
                <a href="https://www.philanthropy.cam.ac.uk/give-now?ucam-ref=global-footer">Give to Cambridge</a>
              </li>
              <li>
                <a href="https://www.jobs.cam.ac.uk">Jobs</a>
              </li>
              <li>
                <a href="https://map.cam.ac.uk/?ucam-ref=global-footer">Map</a>
              </li>
              <li>
                <a href="https://www.cam.ac.uk/about-the-university/visiting-the-university?ucam-ref=global-footer">Visiting the University</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="campl-column3 campl-footer-navigation last" style="height: 232px;">
          <div class="campl-content-container campl-navigation-list">
            <h3><a href="https://www.cam.ac.uk/research?ucam-ref=global-footer">Research at Cambridge</a></h3>
            <ul class="campl-unstyled-list">
              <li>
                <a href="https://www.cam.ac.uk/research/news?ucam-ref=global-footer">Research news</a>
              </li>
              <li>
                <a href="https://www.cam.ac.uk/research/research-at-cambridge?ucam-ref=global-footer">About research at Cambridge</a>
              </li>
              <li>
                <a href="https://www.cam.ac.uk/public-engagement?ucam-ref=global-footer">Public engagement</a>
              </li>
              <li>
                <a href="https://www.cam.ac.uk/research/spotlight-on?ucam-ref=global-footer">Spotlight on...</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
