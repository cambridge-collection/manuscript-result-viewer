var AdvancedSearch = {
  hasResults: 0,
  hideFacets: false,
  initiallyAdvanced: false,
  isAdvanced: false,
  loaded: false,
  campl: 'campl-column12',
  returnLink: null,
  titleElt: null,
  overrideSidebar: null // @CR2018-02-09
};

(function ($) {
// Search results page layout fixer
  $(document).ready(function () {
     // @CR2017-08-19
    AdvancedSearch.titleElt = $('.campl-page-sub-title > div');
    AdvancedSearch.titleElt.css('position', 'relative');

    // the tiniest timeout, so that SI-custom can fill the sidebar first

    setTimeout(function () {
       var search_results = $('div.darwin-search-results-container, #block-cudl-cudl .resultsHeader');
      if (search_results.length) {
         if (search_results.hasClass('resultsHeader')) {
          // need a higher container, not the header
          search_results = search_results.closest('#block-cudl-cudl');
        }

        var $searchtitle = '<h3>Refine your search</h3>';
        $('body').addClass('search-results-page');

         $('.campl-secondary-content').attr('id', 'page-secondary');

        var region_sidebar = AdvancedSearch.ensureSidebar();

        // in case view-my-sidebar doesn't exist
        var my_sidebar = region_sidebar.find('div.view-my-sidebar');
        if (my_sidebar.length == 0) {
          my_sidebar = $('<div class="view-my-sidebar"></div>');
          region_sidebar.append(my_sidebar);
        }

        // in case field-content doesn't exist
        var field_content = my_sidebar.find('div.field-content');
        if (field_content.length == 0) {
          field_content = $('<div class="field-content"></div>');
          my_sidebar.append(field_content);
        }

        // populate, but don't show, facets
        if (AdvancedSearch.hideFacets) {
          if (Drupal.settings.darwin_search &&
            Drupal.settings.darwin_search.isAdvanced) {
            field_content.hide();
          }
        }
         field_content.prepend($searchtitle);

        // require a section for "letters" sidebar content
        var cudl_results = field_content.find('div.cudl-results');
        if (cudl_results.length == 0) {
          cudl_results = $('<div class="cudl-results sidebar-results-list"></div>');
          field_content.append(cudl_results);
        }

        // now, the "this-site" sidebar content needs moving into
        // the same container

        var this_site = $('#page-secondary').find('div.this-site');
        if (this_site.length) {
          this_site.remove();
          field_content.append(this_site);
        }

        $('.contents').children('.facet').appendTo(cudl_results);
        //$('#page-secondary .facetMore a').append(' <span>+</span>');
        //$('#page-secondary .facetLess a').prepend('<span>–</span> ');
        $('#page-secondary .facetLess, #page-secondary .facetMore').each(function () {
          $(this).siblings('.facetName').append(this);
        });
        var result_items = $('.contents .docHit .docHit');
        result_items.addClass('search-result-item');
        result_items.each(function () {
          $(this).find('h2').first().addClass('item-title');
        });

        // TODO MH

       AdvancedSearch.hasResults = 9999999
// result_items.length;
           
// Detects Summary and tweaks layout accordingly
          if ($(this).find('.summary').length) {
            $(this).addClass('has-summary');
            //$(this).find('.summary').insertBefore('table');
          }
        });

          });
         //
@CR2017-04-24 - if only one tab, no need for it to show
        var tab_menu = search_results.find('ul.tab-menu');
        if (tab_menu.find('li a').length == 1) {
          tab_menu.hide();
        }         else {
          tab_menu.show();
        }

        // add behaviour to the tab menu
        tab_menu.find('li a').click(function () {
          tab_menu.find('li a').removeClass('active');
          var cn = $(this).attr('class');
          $(this).addClass('active');
          // hide others, show this sidebar
          region_sidebar.find('div.sidebar-results-list').hide()
            .filter('.' + cn).show();
          // hide other results, show this set
          search_results.find('div.search-results-list').hide()
            .filter('.' + cn).show()
          // trigger "resultsshown" event
            .trigger('resultsshown');
          // reconfigure secondary content
          $('.campl-secondary-content').trigger('reconfigure');

          // site title and search tab
          var h1;
          if (cn == 'this-site') {
            h1 = Drupal.settings.darwinSearch.thisSiteTitle;
            $('#darwin-search-block-form input[name=tab]').val(cn);
          } else {
            h1 = Drupal.settings.darwinSearch.cudlTitle;
            $('#darwin-search-block-form input[name=tab]').val('');
          }
          $('h1.campl-sub-title').text(h1);

           return false;
        });

        // append num items to tab menu
        search_results.find('div.search-results-list').each(function (i, e) {
          var ic = $(this).find('#itemCount');
          if (ic.length) {
            var a = search_results.find('ul.tab-menu li a');
            if ($(this).hasClass('this-site')) {
              a = a.filter('.this-site');
            } else {
              a = a.filter(':not(.this-site)');
            }
            a.text(a.text() + ' [' + ic.text() + ']');
          }
        });

        // see if a "this-site" tab should be active
        if ($.fn.getQueryParameter('tab') == 'this-site') {
          // click the first one
          search_results.find('ul.tab-menu li a.this-site').click();
        } else {
          // click the first one
          search_results.find('ul.tab-menu li a:first').click();
        }
      }

      // @CR2017-04-24 - may now hide sidebar if no content...
      AdvancedSearch.setSidebarVisibility();

      /**
       * @PC012 - integrate advanced search form
       */
      AdvancedSearch.init();
    }, 0);
   });

  // helper to get a parameter from the query string
  $.fn.getQueryParameter = function (key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
  };

  AdvancedSearch.init = function () {
    // if advanced should initially be shown
    AdvancedSearch.initiallyAdvanced =
Drupal.settings.darwin_search &&       Drupal.settings.darwin_search.isAdvanced;

    setTimeout(AdvancedSearch.delayInit, 0);

    // @CR2017-04-24 - annoyingly the Cambridge theme always makes
    // the sidebar visible when the window is resized, we may now
    // need to hide it again

    AdvancedSearch.isSizing = false;
    $(window).resize(function(){
      if (AdvancedSearch.isSizing) {
        return;
      }
      AdvancedSearch.isSizing = true;
      setTimeout(AdvancedSearch.setSidebarVisibility, 0);
    });
  };

  AdvancedSearch.delayInit = function () {
    AdvancedSearch.block = $('#block-darwin-search-darwin-search');
    if (!AdvancedSearch.block.length) {
      return;
    }
    AdvancedSearch.mainContent = AdvancedSearch.block.children('div:not(.contextual-links-wrapper)');

    // always have a sidebar
    AdvancedSearch.ensureSidebar();
    AdvancedSearch.ensureAdvancedSidebar();
    AdvancedSearch.setSidebarVisibility();

    // if ($('div.region-sidebar').length) {
    //   // adjust search form width, so that "advanced-search" link appears in correct place
    //   AdvancedSearch.campl = 'campl-column9';
    //   AdvancedSearch.mainContent.addClass(AdvancedSearch.campl);
    // }

    AdvancedSearch.block.find('div.advanced-search a').click(function () {
      if (!AdvancedSearch.isAdvanced) {
        AdvancedSearch.showAdvanced();
      }
      return false;
    });

    // if advanced should initially be shown
    if (AdvancedSearch.initiallyAdvanced) {
       // @CR2017-08-19
      // when advanced search - append a "return to advanced search" link
      if (!AdvancedSearch.returnLink) {
        AdvancedSearch.returnLink = $('<a id="returnLink" href="#">show advanced search parameters</a>');
        AdvancedSearch.titleElt.children('div:first').prepend(AdvancedSearch.returnLink);
        AdvancedSearch.returnLink.click(function() {
          AdvancedSearch.showAdvanced();
          return false;
        })
      }

      // hide facets results content in advanced mode
      if (AdvancedSearch.hideFacets) {
        var region_sidebar = $('div.region-sidebar');
        region_sidebar.find('div.view-my-sidebar div.field-content').hide();
      }

      // pass on search values
      AdvancedSearch._initParams = Drupal.settings.darwin_search.params;

      var showAdvanced = $.fn.getQueryParameter('showadvanced');

      // but, only show if NO results, or we requested a blank search form
      if (!AdvancedSearch.hasResults || showAdvanced) {
        AdvancedSearch.showAdvanced();
      }

      // @CR2017-08-19
      // if no results, don't show "sorry no results"
      if (!AdvancedSearch.hasResults) {
        $('div.darwin-search-results').html('<p>No results were found for your search query.</p>');
      }
    }
  };

  /**
   * display advanced search forms
   * load if not loaded
   */
  AdvancedSearch.showAdvanced = function () {
    AdvancedSearch.isAdvanced = true;
    if (!AdvancedSearch.loaded) {
      AdvancedSearch.load();
      return false;
    }

    AdvancedSearch.mainContent.hide();
    AdvancedSearch.advancedContent.show();
    AdvancedSearch.advancedHeader.show();
    AdvancedSearch.block.addClass('with-advanced');
    AdvancedSearch.mainH1.closest('.campl-row').hide();
    AdvancedSearch.advH1.show();
    $('body').addClass('with-advanced-search');

    // if advanced wasn't initially shown
    // if (!AdvancedSearch.initiallyAdvanced) {
    var region_sidebar = $('div.region-sidebar');
    // facets hidden
    if (AdvancedSearch.hideFacets) {
      region_sidebar.find('div.view-my-sidebar div.field-content').hide();
    }
    // ensure tips shown
    region_sidebar.find('div.srch-sidebar div.tips').show();
    // }

    // @CR2017-04-24 - may now hide sidebar if no content...
    AdvancedSearch.setSidebarVisibility();

    $('.campl-secondary-content').trigger('reconfigure');

    return false;
  };

  AdvancedSearch.showSimple = function () {
    if (!AdvancedSearch.isAdvanced) {
      return false;
    }

    AdvancedSearch.isAdvanced = false;
    AdvancedSearch.mainContent.show();
    AdvancedSearch.advancedContent.hide();
    AdvancedSearch.advancedHeader.hide();
    AdvancedSearch.block.removeClass('with-advanced');
    AdvancedSearch.mainH1.closest('.campl-row').show();
    AdvancedSearch.advH1.hide();
    $('body').removeClass('with-advanced-search');

    // // if advanced wasn't initially shown
    // if (!AdvancedSearch.initiallyAdvanced) {
    var region_sidebar = $('div.region-sidebar');
    // facets shown
    if (AdvancedSearch.hideFacets) {
      region_sidebar.find('div.view-my-sidebar div.field-content').show();
    }
    // ensure tips hidden
    region_sidebar.find('div.srch-sidebar div.tips').hide();
    // }

    // @CR2017-04-24 - may now hide sidebar if no content...
    AdvancedSearch.setSidebarVisibility();

    $('.campl-secondary-content').trigger('reconfigure');

    return false;
  };

  /**
   * load advanced search templates, then return to display
   */
  AdvancedSearch.load = function () {
    AdvancedSearch.loaded = 'loading';

    // initialise with search parameters
    var params = {};
    if (AdvancedSearch._initParams) {
      params = AdvancedSearch._initParams;
      AdvancedSearch._initParams = false;
    }

    $.post('/advanced-search-json',
{},
function (response) {
      if (!response.forms) {
        if (console) console.log('advanced-search-json failed');
        return;
      }

      AdvancedSearch.loaded = true;
      // this may be from advnaced search BLOCK
      AdvancedSearch.mainH1 = $('h1.campl-sub-title:first');
      AdvancedSearch.advH1 = AdvancedSearch.mainH1.clone().addClass('srch-h1');
      AdvancedSearch.advancedHeader = $(response.header);
      // AdvancedSearch.advancedHeader.addClass(AdvancedSearch.campl);
      AdvancedSearch.advancedContent = $('<div id="advanced-search-forms"></div>');
      AdvancedSearch.advancedContent.append($(response.forms));

      // don't allow minimise advanced when we're come to the blank search form
      var showAdvanced = $.fn.getQueryParameter('showadvanced');
      if (showAdvanced) {
        AdvancedSearch.advancedHeader.find('a.simple-search').remove();
      }

//        $('body').addClass
//        AdvancedSearch.block.append(AdvancedSearch.advancedContent);
      AdvancedSearch.block.append(AdvancedSearch.advancedHeader);
      $('#page-content').prepend(AdvancedSearch.advancedContent);

      // append advanced search tips - @CR2017-04-24 - in srch-search
      var sidebarView = $('div.region-sidebar div.srch-sidebar:first');
      sidebarView.prepend(response.sidebar);

       AdvancedSearch.showAdvanced();
      // // don't need to repeat this text
      // if (AdvancedSearch.advH1.text() != 'Advanced Search') {
      //   AdvancedSearch.advancedContent.after(AdvancedSearch.advH1);
      // }

      AdvancedSearch.advancedHeader.find('a.simple-search').click(AdvancedSearch.showSimple);
      AdvancedSearch.advancedContent.find('#form > ul li:first a').addClass('active');

      // add behaviour to the tab menu
      AdvancedSearch.advancedContent.find('#form > ul li a').click(function () {
        AdvancedSearch.advancedContent.find('#form > ul li a').removeClass('active');
        var cn = $(this).attr('href');
        $(this).addClass('active');
        // hide all forms, show this
        AdvancedSearch.advancedContent.find('#form form').hide().filter('#' + cn).show();
        return false;
      });

      // if (console) console.log(params);

      var hasParams = false,
value,
inp;
      for (var name in params) {
        hasParams = true;

        /*
         // if we've refined the search, then params
         // may possibly have ended up with multiple parts with
         // semi-colon delimiter
         // just take the first part for the form
         var param = params[n].split(';')[0];
         */

        value = params[name];

        if (name.match(/^f[0-9]-/)) {
          // pass on further filter parameters, e.g. f2-addressee
          var inp = $('<input type="hidden" />').attr('name', name).val(value);
          AdvancedSearch.advancedContent.find('form').append(inp);
        }         else {
           // these two both share the correspondent field
          switch (name) {
            case 'search-author':
            case 'search-addressee':
              AdvancedSearch.advancedContent.find('input[name=correspondent-type][value=' + name + ']').attr('checked', 'checked');
              name = 'search-correspondent';
              break;
          }

          inp = AdvancedSearch.advancedContent.find('input[name=' + name + ']');

          if (inp.attr('type') == 'radio') {
            inp.each(function (i, e) {
              if (e.value == value) {
                $(e).attr('checked', 'checked');
              }  
          });    
      }           else {
            inp.val(value);
          }
        }
      }

      if (hasParams) {
        AdvancedSearch.advancedContent.find('#form > ul li a').filter(function (e) {
          return $(this).text().toLowerCase() ==
Drupal.settings.darwin_search.tab.toLowerCase();
        }).click();
      }

      // MIKE's scripts

      function clear_date_max() {
        $(".between").addClass('element-invisible');
        $(".between input").val('');
      }

      if (!($(".between input").val() || $("#d4").is(':checked'))) {
        clear_date_max()
      }
      $("#letter").submit(function (event) {
        $("input[name=correspondent-type]:radio").removeAttr('name value');
      });
      $("input[name=correspondent-type]:radio").change(function () {
        var correspondent_type = $(this).attr('value');
        $("#correspondent").attr('name', correspondent_type);
      });

      // set initial correspondent-type
      if ($.fn.getQueryParameter('search-author')) {
        $('input[name=correspondent-type][value=search-author]').change();
      }       else if ($.fn.getQueryParameter('search-addressee')) {
        $('input[name=correspondent-type][value=search-addressee]').change();
      }

      $("input[name=search-date-type]").change(function () {
        var search_date_type = $(this).attr('value');
        if (search_date_type == 'between') {
          $(".between").removeClass('element-invisible');
        } else {
          clear_date_max();
        }
      });
    },
'json');
  }

   AdvancedSearch.ensureSidebar = function () {
    // in case region-sidebar doesn't exist
    var region_sidebar = $('div.region-sidebar');
    if (region_sidebar.length == 0) {
      region_sidebar = $('<div class="region-sidebar"></div>');

      // @CR2017-04-07 - advanced search - secondary-content missing
      if ($('.campl-secondary-content').size() == 0) {
         // default to not showing empty sidebar
        AdvancedSearch.noDefaultSidebar = true;

        // Adds basic sidebar markup
        var sidebar = $('<div id="page-secondary" class="campl-column3 campl-secondary-content"> \
							<div class="region region-sidebar"> \
								<div class="view view-my-sidebar view-id-my_sidebar view-display-id-block"> \
									<div class="view-content"> \
										<div class="views-row views-row-1 views-row-odd views-row-first views-row-last"> \
											<div class="views-field views-field-field-side-text"> \
												<div class="field-content"> \
												</div> \
											</div> \
										</div> \
									</div> \
								</div> \
							</div> \
						</div>');

        // initially hidden
        sidebar.css('display', 'none');
        sidebar.insertAfter('.campl-main-content');
        // $(".campl-main-content").removeClass('campl-column12').addClass('campl-column9');
        // $(".campl-secondary-content").show();

        // console.log('added region side');
      }       else {
        $('#page-secondary').append(region_sidebar);

        // console.log('region side already found');
      }

      region_sidebar = $('div.region-sidebar');
    }     else {
      if (AdvancedSearch.noDefaultSidebar === undefined) {
        // there was initially a sidebar, but it was empty keep it anyway
        AdvancedSearch.noDefaultSidebar = false;
      }
    }

    if (AdvancedSearch.noDefaultSidebar === undefined) {
      var txt = $.trim(region_sidebar.text());
      if (!txt) {
        // default to not showing empty sidebar
        AdvancedSearch.noDefaultSidebar = true;
      }       else {
        AdvancedSearch.noDefaultSidebar = false;
      }
    }

    // now we're going to store this away, and show and hide it as necessary
    AdvancedSearch.pageSecondary = $('#page-secondary');

    return region_sidebar;
  };

  /**
   * @CR2017-04-24 - always want search tips at the top
   * find or create "srch-sidebar"
   * (adv-sidebar was hidden by ADBLOCKER!)
   */
  AdvancedSearch.ensureAdvancedSidebar = function () {
    var region_sidebar = AdvancedSearch.ensureSidebar();

    // in case search-sidebar doesn't exist
    var adv_sidebar = region_sidebar.find('div.srch-sidebar');
    if (adv_sidebar.length == 0) {
      adv_sidebar = $('<div class="srch-sidebar"></div>');
      region_sidebar.prepend(adv_sidebar);
    }

    return adv_sidebar;
  }

  AdvancedSearch.isSidebarHidden = function () {
    return AdvancedSearch.noDefaultSidebar &&
!AdvancedSearch.hasResults &&
!AdvancedSearch.isAdvanced 
     && !AdvancedSearch.overrideSidebar; 
 }

  AdvancedSearch.setSidebarVisibility = function () {
    // console.log(AdvancedSearch.noDefaultSidebar, AdvancedSearch.hasResults, AdvancedSearch.isAdvanced);
    // if no default, no results, and not advanced
    if (AdvancedSearch.isSidebarHidden()) {
      console.log('AdvancedSearch.isSidebarHidden:ishidden');
      setTimeout(function () {
        //$(".campl-main-content").removeClass('campl-column9').addClass('campl-column12');
        //$("#page-secondary").hide();
        if ($('body').hasClass('page-letter')) {
          $('.campl-page-header:last .campl-column12')
            .removeClass('campl-column9').addClass('campl-column12');
        }
      }, 0);
      if (AdvancedSearch.mainContent) {
        //AdvancedSearch.mainContent.removeClass('campl-column9').addClass('campl-column12');
      }
      if (AdvancedSearch.advancedHeader) {
        //AdvancedSearch.advancedHeader.removeClass('campl-column9').addClass('campl-column12');
      }
      // @CR2017-08-19
      if (AdvancedSearch.titleElt) {
        //AdvancedSearch.titleElt.removeClass('campl-column9').addClass('campl-column12');
      }

      // console.log('no side');
    }     else {
      $(".campl-main-content").removeClass('campl-column12').addClass('campl-column9');
      $("#page-secondary").show();
      if ($('body').hasClass('page-letter')) {
        $('.campl-page-header:last .campl-column12')
          .removeClass('campl-column12').addClass('campl-column9');
      }
      if (AdvancedSearch.mainContent) {
        AdvancedSearch.mainContent.removeClass('campl-column12').addClass('campl-column9');
      }
      if (AdvancedSearch.advancedHeader) {
        AdvancedSearch.advancedHeader.removeClass('campl-column12').addClass('campl-column9');
      }
      // @CR2017-08-19
      if (AdvancedSearch.titleElt) {
        AdvancedSearch.titleElt.removeClass('campl-column12').addClass('campl-column9');
      }
    }

    // in case world map is shown, size change will affect markers
    // also timeline
    setTimeout(function () {
      $('#darwin-worldmap').trigger('reconfigure');
      $('#timeline').trigger('window.resize');
    }, 100);

    // if here because of a window resize event
    if (AdvancedSearch.isSizing) {
      AdvancedSearch.isSizing = false;
    }
  };


})(jQuery);
