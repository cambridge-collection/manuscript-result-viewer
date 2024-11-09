$ = jQuery

Drupal.behaviors.tabMenu = {}
Drupal.behaviors.tabMenu.attach = function (context, settings) {
  if (
    $('#cudl_content_container').length &&
    $('#cudl_content_container > .letter').length
  ) {
    var letter_container = $('#cudl_content_container').closest('.cudl_single')
    if (!letter_container.length) {
      letter_container = $('body')
    }

    // add behaviour any unattached tab menu
    var tab_menu = letter_container.find('ul.tab-menu:not(.attached)')
    if (!tab_menu.length) {
      tab_menu = $('#block-cudl-cudl ul.tab-menu:not(.attached)')
    }
    if (tab_menu.length) {
      tab_menu.addClass('attached')
      tab_menu.prependTo(letter_container.closest('.region-content'))

      // todo: remove this when Mike updates
      tab_menu.find('li').each(function (i, e) {
        // expect an <A> tag, not just LI
        var elt = $(e)
        if (elt.children('a').length == 0) {
          var t = elt.text()
          elt.html('')
          elt.append($('<a href="#"></a>').text(t))
        }
      })

      /**
       * @CR2017-02-08 - insert "Around this date" link if not found
       */
      if (tab_menu.find('li#tableLink').length == 0) {
        var elt = $('<li id="tableLink"><a href="#">Around this date</a></li>')
        tab_menu.append(elt)
      }

      /**
       * @CR2017-04-24 - insert "With this correspondent" link if not found
       */
      if (tab_menu.find('li#correspondentLink').length == 0) {
        var elt = $(
          '<li id="correspondentLink"><a href="#">With this correspondent</a></li>',
        )
        tab_menu.append(elt)
      }

      /**
       * @CR2017-02-08 - if "original" scan exists, add note to secondary content
       */
      if (tab_menu.find('li#scanLink').length == 1) {
        // after secondary content has been filled
        setTimeout(function () {
          $('.views-field-field-side-text .field-content:last').append(
            '<div class="">Images of original letters from the Cambridge University Library collections are courtesy of Cambridge University Digital Library (<a href="http://cudl.lib.cam.ac.uk">cudl.lib.cam.ac.uk</a>).</div>',
          )
        }, 250)
      }

      if ($('#tableLink').length > 0) {
        $("<div id='readanother'>Find the next letter</div>").insertAfter(
          $('#letter .body-content'),
        )
        $('#readanother').hide()

        setTimeout(function () {
          $('#readanother:hidden').fadeIn('slow')
        }, 1500)

        $('#readanother').on('click', function () {
          if ($('#correspondentLink').length > 0) {
            $('#correspondentLink >  a').trigger('click')
          } else {
            $('#tableLink >  a').trigger('click')
          }
          $('html, body').animate(
            {
              scrollTop: $('#tableLink').offset().top,
            },
            1000,
          )
        })
      }
      // add "click" to each
      tab_menu.find('li a').click(function () {
        // close any footnote popups
        $('#footnotepopup').remove()
        $("sup[id^='back-mark']").removeClass('selectedFootnote')

        if ($(this).hasClass('active')) {
          return false
        }
        tab_menu.find('li a').removeClass('active')
        var id = $(this).parent().attr('id')
        $(this).addClass('active')
        // hide others, show this item
        switch (id) {
          case 'transcriptLink':
            $('#cudl_content_container > .letter').show()
            $('#cudl_content_container > .translation').hide()
            $('#cudl_content_container > #seadragoncontainer').hide()
            $('.darwin-timeline-container #darwin_timeline_letter_table').hide()
            $(
              '.darwin-timeline-container-correspondent #darwin_timeline_letter_table',
            ).hide()
            break
          case 'translationLink':
            $('#cudl_content_container > .letter').hide()
            $('#cudl_content_container > .translation').show()
            $('#cudl_content_container > #seadragoncontainer').hide()
            $('.darwin-timeline-container #darwin_timeline_letter_table').hide()
            $(
              '.darwin-timeline-container-correspondent #darwin_timeline_letter_table',
            ).hide()
            break
          case 'scanLink':
            $('#cudl_content_container > .letter').hide()
            $('#cudl_content_container > .translation').hide()
            $('#cudl_content_container > #seadragoncontainer').show()
            $('.darwin-timeline-container #darwin_timeline_letter_table').hide()
            $(
              '.darwin-timeline-container-correspondent #darwin_timeline_letter_table',
            ).hide()
            break
          case 'tableLink':
            $('#cudl_content_container > .letter').hide()
            $('#cudl_content_container > .translation').hide()
            $('#cudl_content_container > #seadragoncontainer').hide()
            $('.darwin-timeline-container #darwin_timeline_letter_table').show()
            $(
              '.darwin-timeline-container #darwin_timeline_letter_table',
            ).trigger('show')
            $(
              '.darwin-timeline-container-correspondent #darwin_timeline_letter_table',
            ).hide()
            break
          case 'correspondentLink':
            $('#cudl_content_container > .letter').hide()
            $('#cudl_content_container > .translation').hide()
            $('#cudl_content_container > #seadragoncontainer').hide()
            $('.darwin-timeline-container #darwin_timeline_letter_table').hide()
            $(
              '.darwin-timeline-container-correspondent #darwin_timeline_letter_table',
            ).show()
            $(
              '.darwin-timeline-container-correspondent #darwin_timeline_letter_table',
            ).trigger('show')
            break
        }

        // reconfigure secondary content size
        $('.campl-secondary-content').trigger('reconfigure')

        return false
      })

      tab_menu.find('li a:first').click()
    }
  }
}

/*
 Surface Impression custom script
 */

/**
 * @moved search results fixer to darwin_search module
 */
$(document).on('closing', '.remodal', function (e) {
  var vimeoframe = $('#vimeo')[0]
  var player = $f(vimeoframe)
  player.api('pause')
})

$(function () {
  $("#block-system-main div:contains('letter')").each(function () {
    if ($.trim($(this).text()) == 'letter') {
      $(this).remove()
    }
  })
  $('#iframe1').attr(
    'src',
    'https://demo.surfaceimpression.digital/darwin/editor/index.html',
  )
  $('#iframe2').attr(
    'src',
    'https://demo.surfaceimpression.digital/darwin/editor/garden.html',
  )
  if ($(window).width() < 767) {
    $('.block-darwin-search .form-text').attr('placeholder', 'Search...')
  }

  var dateregex = /(From|To)\s(.*)\s\s([0-9].*$)/
  var titleString = $('.opener h1').text()
  //titleString = titleString.replace(dateregex,"<span>$1</span> $2 <time>$3</time>");
  //$(".opener h1").html(titleString);

  $('.campl-global-header:first').css('z-index', '199')
  var counter = 0
  $('.box.promo').each(function () {
    $(this)
      .find('.file-image a')
      .attr('href', $(this).find('a:first').attr('href'))
    $(this).on('click', function () {
      window.location.href = $(this).find('a:first').attr('href')
    })
    if ($(window).width() > 600) {
      if (counter % 2 == 0) {
        $(this).addClass('leftpromo')
      } else {
        $(this).addClass('rightpromo')
      }
      counter++
    }
  })

  $('#block-block-37 .file-image a').attr(
    'href',
    $('#block-block-37 a:last').attr('href'),
  )

  $('.meet-people .file-image').each(function () {
    $(this).find('.content').height($(this).find('.content').width())
    $(this)
      .find('a')
      .attr(
        'href',
        $(this).parents('td').find('.views-field-title a').attr('href'),
      )
  })

  if ($('.node-type-page').length) {
    $('#block-system-main .field-type-image img').each(function () {
      // Get on screen image
      var screenImage = $(this)

      // Create new offscreen image to test
      var theImage = new Image()
      theImage.src = screenImage.attr('src')

      // Get accurate measurements from that.
      var $w = theImage.width
      var $h = theImage.height

      if ($w < 600) {
        $(this).parent().addClass('small-image')
      } else if ($h >= $w) {
        $(this).parent().addClass('portrait-image')
      }
      if (window.console) {
        console.log('width is = ' + $w)
      }
    })
  }

  $(".campl-local-navigation-container li.first:contains('overview')").remove()

  // Crop for portrait images > 600px
  $(function () {
    var imageHeight,
      wrapperHeight,
      overlap,
      container = $('.portrait-image')

    function centerImage() {
      imageHeight = container.find('img').height()
      wrapperHeight = container.height()
      overlap = (wrapperHeight - imageHeight) / 2
      container.find('img').css('margin-top', overlap)
    }

    $(window).on('load resize', centerImage)
    var el = $('.portrait-image')
  })

  // fix included images

  $('#cudl_content_container .figure img').each(function () {
    $(this).attr(
      'src',
      $(this).attr('src').split('data/images/').join('/sites/default/files/'),
    )
  })

  /// load schools content

  if ($('.page-node-198').size() > 0) {
    $('.campl-main-content').prepend("<div id='schools-inclusion' />")
    $('#schools-inclusion').load(
      '/sites/all/static/The%20Offer%20of%20a%20Liftetime_.html',
    )
  }

  if ($('.SI-7-11').size() > 0) {
    //$(".campl-content-container .field-name-body .field-item").children().hide();
    $('.campl-content-container .field-name-body .field-item h3')
      .wrapInner("<a data-remodal-target='intromodal' />")
      .addClass('button')
      .show()
    $('.campl-content-container .field-name-body').prepend(
      $('.campl-content-container .field-name-body h3.button'),
    )
    $('.campl-content-container .field-name-body .field-item .intro').wrap(
      "<div data-remodal-id='intromodal' id='intromodal' />",
    )
    $('[data-remodal-id=intromodal]').remodal()
  }

  // deal with schools content video
  var iframeCount = 0
  $('.SI-7-11 .block-block iframe').each(function () {
    iframeCount++
    $(this)
      .parent()
      .append(
        "<p><a data-remodal-target='videomodal" +
          iframeCount +
          "'>Watch video</a></p>",
      )
    $(this).wrap(
      "<div data-remodal-id='videomodal" +
        iframeCount +
        "' id='videomodal" +
        iframeCount +
        "' />",
    )

    $('[data-remodal-id=videomodal' + iframeCount + ']').remodal()
  })

  $('.SI-7-11 .region-content .block-block').each(function () {
    if ($(this).find('a:last').size() > 0) {
      if (
        $(this).find('a:last').attr('href') &&
        $(this).find('a:last').attr('href').indexOf('ppt') != -1
      ) {
        $(this).find('a:last').attr('download', 'presentation.pptx')
        $(this).find('.file-image a').attr('download', 'presentation')
      }
    }

    if ($(this).is(':first')) {
      $(this).find('h2:first').css('background-color', '#dc8a14')
    }

    if ($(this).is(':last-child')) {
      if (
        $(this)
          .find('.campl-heading-container h2')
          .text()
          .indexOf('Discussion') != -1
      ) {
        $(this).append("<p><a data-remodal-target='questionmodal'>View</a></p>")
        $(this)
          .find('.collapse')
          .wrapAll("<div data-remodal-id='questionmodal' />")
        $('[data-remodal-id=questionmodal] .collapse p').hide()
        $('[data-remodal-id=questionmodal] .collapse .suggested p').show()
        $(
          '[data-remodal-id=questionmodal] .collapse h4,[data-remodal-id=questionmodal] .collapse .suggested',
        ).on('click', function () {
          $(this).parent().find('p').slideDown()
        })
        $('[data-remodal-id=questionmodal]').remodal()
      }
    }
    $(this)
      .find('.file-image a')
      .attr('href', $(this).find('a:last').attr('href'))
  })

  // handle references

  $('.node-type-page .field-name-field-file-reference').each(function () {
    var URL = $(this).text()
    if (URL.indexOf('http') != -1) {
      $(this).parent().find('a:first').attr('href', URL)
      $(this)
        .parent()
        .find('.field-name-field-credit .field-item')
        .wrap("<a href='" + URL + "' />")
      $(this).hide()
    }
  })

  $('.campl-teaser').each(function () {
    $(this)
      .find('.file-image a')
      .attr('href', $(this).find('.campl-teaser-title a').attr('href'))
  })
  $('.view-topics li').each(function () {
    $(this)
      .find('.views-field-field-tag-image a')
      .attr('href', $(this).find('.views-field-name a').attr('href'))
  })

  $('.field-name-field-credit .field-items a').each(function () {
    $(this).append(
      $(this)
        .parent()
        .parent()
        .parent()
        .find('.field-name-field-file-copyright'),
    )
  })

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  $(".facetSubGroup .col2 a[href*='date']")
    .not('.facetSubGroup .facetSubGroup a')
    .each(function () {
      var monthIndex = parseInt($(this).text()) - 1
      $(this).text(months[monthIndex])
    })

  // Letter page layout fixer
  // var letter_container = $('.cudl_single .letter');
  // if ($('.cudl_single .letter').size()==0) {
  // 	letter_container = $("body[class^='page-letter-']");
  // }
  if (
    $('#cudl_content_container').length &&
    $('#cudl_content_container > .letter').length
  ) {
    var letter_container = $('#cudl_content_container').closest('.cudl_single')
    if (!letter_container.length) {
      letter_container = $('body')
    }

    // $(".opener h1").wrap("<div class='opener' />");
    // //$(".region-content").prepend($(".opener > .opener"));
    // $("h1.campl-sub-title").html($(".opener > .opener:first"));

    // Adds basic sidebar markup
    var $sidebar =
      '<div id="page-secondary" class="campl-column3 campl-secondary-content"> \
							<div class="region region-sidebar"> \
							</div> \
						</div>'

    // Tweaks page layout, then adds content to sidebar
    //$('#page-content').removeClass('campl-column12').addClass('campl-column9');
    /*if ($('.campl-secondary-content').size() == 0) {
      $($sidebar).insertAfter('.campl-main-content')
      $('.campl-main-content')
        .removeClass('campl-column12')
        .addClass('campl-column9')
      $('.campl-secondary-content').show()
    }*/
    $('body').addClass('page-letter')
    $('.campl-secondary-content').attr('id', 'page-secondary')

    //@CR2017-04-08
    var regionSidebar = $('.campl-secondary-content div.region-sidebar')
    if (regionSidebar.find('div.view-my-sidebar').length == 0) {
      var mySidebar =
        '<div class="view view-my-sidebar view-id-my_sidebar view-display-id-block"> \
									<div class="view-content"> \
										<div class="views-row views-row-1 views-row-odd views-row-first views-row-last"> \
											<div class="views-field views-field-field-side-text"> \
												<div class="field-content"> \
												</div> \
											</div> \
										</div> \
									</div> \
								</div>'
      regionSidebar.append(mySidebar)
    }

    // // create letter-extras after CUDL block
    // $('<div id="letter-extras"></div>').insertAfter('#block-cudl-cudl');

    // move Summary to page-secondary
    $('#summary').appendTo('#page-secondary .field-content')
    // move letter details, terms and citations to page-secondary (RHS)
    $('#letter_details').appendTo('#page-secondary .field-content')
    $('#terms').appendTo('#page-secondary .field-content')
    $('.cite').appendTo('#page-secondary .field-content')

    // Makes the wrapper class the same as regular pages
    $('#page-content').addClass('content')

    /**
     * @CR2017-04-24 - hide "terms" links altogether
     * after advanced search, the letter details content contains nicer version of this
     * and the links in here appear to be no use, so will hide for now
     */
    $('#terms').hide()

    // todo: check needed
    // Formats the Terms section
    $('#terms h3').each(function () {
      // Changes the title of "Other"
      if ($(this).text() == 'Other') {
        $(this).text('General')
      }
      // Turns each title into a nice value to use as a class
      var $id = $(this).text().toLowerCase().split(' ').join('-')
      // Wraps each chunk in a div with the class
      $(this)
        .next('ul')
        .andSelf()
        .wrapAll("<div class='" + $id + "' />")
    })
    // Change the Terms main title
    $('#terms h2')
      .filter(function () {
        return $(this).text() == 'Subjects'
      })
      .text('Terms')

    // // Bibliography
    // $('.bibl').addClass('box').appendTo('#letter-extras').find('.provenance').prepend('<div class="label"><i class="material-icons">account_balance</i> <span class="title">Provenance</span></div> ');

    // // Enclosures
    // $('.enclosure h2').filter(function(){
    // 	return $(this).text() == "[Enclosure]";
    // }).text('Enclosure');
    // $('.enclosures').addClass('box').appendTo('#letter-extras');

    // // More boxes
    // $('.annotations').addClass('box').appendTo('#letter-extras');
    // $('.footnotes').addClass('box').appendTo('#letter-extras');

    // $(".call-url").appendTo('#letter-extras');

    // Letter details
    $('#letter_details dt').each(function () {
      if ($(this).text() == 'Souce of text') {
        $(this).text('Source of text')
      }
      if ($(this).text() == 'Physcial description') {
        $(this).text('Physical description')
      }
      var $id = $(this).text().toLowerCase().split(' ').join('-')
      $(this)
        .next('dd')
        .andSelf()
        .wrapAll("<span class='" + $id + "' />")
    })

    // $('#letter_details .from').prepend('<i class="material-icons">account_circle</i>');
    // $('#letter_details .to').prepend('<i class="material-icons">account_circle</i>');
    // $('#letter_details .sent-from').prepend('<i class="material-icons">language</i>');
    // $("#letter_details .source-of-text,#letter_details dl span:first").prepend('<i class="material-icons">library_books</i>');
    // $('#letter_details .physical-description').prepend('<i class="material-icons">remove_red_eye</i>');

    // Makes footnotes into links
    $('sup[data-target]').each(function () {
      var $i = $(this).attr('data-target').split('.').join('_')
      $(this).wrap('<a href="' + $i + '" class="footnotelink"></a>')
    })

    $('.footnote').each(function () {
      $(this).attr('id', $(this).attr('id').split('.').join('_'))
    })

    // sort out sort options
    if ($("select[name='sort']").size() > 0 && urlParam('sort') != undefined) {
      var sortParam = urlParam('sort')

      $("select[name='sort'] option").removeAttr('selected')
      $("select[name='sort'] option").each(function () {
        if ($(this).val() == sortParam) {
          $(this).attr('selected', 'selected')
        }
      })
    }

    // // Bibliography pages
    // var $str = $('h1.campl-sub-title').text();
    // if ($str.indexOf("bibliographies") >= 0){
    // 	$('body').addClass('bibliography-page');
    //
    // 	$('#block-cudl-cudl h3').each(function(){
    // 		var $id2 = $(this).text().toLowerCase().split(' ').join('-');
    // 		$(this).addClass('capitalize');
    // 		$(this).next('p, ul').andSelf().wrapAll("<div class='"+$id2+"' />");
    // 	});
    //
    // 	$('.location').appendTo('#page-secondary .field-content');
    // 	$('.volumes').appendTo('#page-secondary .field-content');
    // }

    // move letter title above it all
    // var h1 = letter_container.find('#letter div.opener h1');
    // if (h1.length) {
    // 	h1.prependTo(letter_container.closest('.region-content'))
    // 		.addClass('letter-title');
    // }

    //				h1.addClass('campl-sub-title').addClass('campl-content-container');

    // footnotes popup
    //$("a.footnotelink").on("click", openFootnoteModal);

    openFootnoteModal = function (e, larger) {
      e.preventDefault()
      let element = $(e.target).closest('a')
      $('#footnotepopup').remove()
      $("sup[id^='back-mark']").removeClass('selectedFootnote')
      element.find('sup:first').addClass('selectedFootnote')
      var id = element.attr('href')

      $('body').append("<div id='footnotepopup' />")

      $('#footnotepopup').append($(id).html())
      $('#footnotepopup').css({
        width: Math.max(150, $(window).width() * 0.33) + 'px',
        padding: '15px',
        border: '4px solid #DDD',
        'box-shadow': '0 0 5px #000',
        position: 'absolute',
        background: '#FFF',
        left:
          Math.min(
            e.pageX,
            $(window).width() - Math.max(200, $(window).width() * 0.33),
          ) + 'px',
        top: e.pageY + 'px',
        'font-size': larger ? '1rem' : '0.8rem',
        'line-height': 1.4,
        'z-index': 10000001,
      })
      $('#footnotepopup').append(
        "<div id='footnoteclose' ><i class='material-icons'>close</i></div>",
      )
      $('#footnoteclose').on('click', function () {
        $("sup[id^='back-mark']").removeClass('selectedFootnote')
        $(this).parent().remove()
      })
      return false
    }

    $('a.footnotelink').on('click', function (e) {
      return openFootnoteModal(e, false)
    })
    $('.footnote .note_number').on('click', function () {
      $('#footnotepopup').remove()
      $("sup[id^='back-mark']").removeClass('selectedFootnote')
      var id = $(this).parent().attr('id')
      if ($('#back-mark-' + id).size() > 0) {
        $('html, body').animate(
          {
            scrollTop: $('#back-mark-' + id).offset().top - 100,
          },
          1000,
          'swing',
          function () {
            $('#back-mark-' + id).addClass('selectedFootnote')
          },
        )
      }
    })
  }

  //* @PC -- why commented out I wonder...

  if ($('.campl-secondary-content').on) {
    $('.campl-secondary-content').on('reconfigure', {}, function () {
      setTimeout(function () {
        var primary = $('.campl-main-content')
        primary.css('min-height', '')
        // reconfigure content heights
        var secondary = $('.campl-secondary-content')
        secondary.css('min-height', '')

        // sidebar inner
        var sidebar = $('.region-sidebar')

        if (primary.length == 0 || secondary.length == 0) {
          return
        }

        // force layout reflow
        primary[0].offsetHeight
        secondary[0].offsetHeight

        var defaultHeight = secondary.height()

        // console.log(secondary, defaultHeight, primary.height());

        var maxColumnHeight = Math.max(defaultHeight, primary.height())
        maxColumnHeight = Math.max(
          sidebar.height() - 60 /* it's got a top margin of -8.5em*/,
          maxColumnHeight,
        )

        if ($('.campl-tertiary-navigation').length > 0) {
          $(
            '.campl-tertiary-navigation, .campl-secondary-content, .campl-main-content',
          ).css({ 'min-height': maxColumnHeight + 50 + 'px' })
          //uneven height distribution on nav and sec columns
        } else {
          $('.campl-main-content').css({ 'min-height': maxColumnHeight + 'px' })
          secondary.css({ 'min-height': maxColumnHeight + 50 })
        }
      }, 250)
    })
  }
  //*/

  $('.physical-description dd').append(
    "<span class='codes-explanation'><a href='/letters/symbols-and-abbreviations'>See symbols &amp; abbreviations</a></span>",
  )

  $('.field-name-body td')
    .has('.file-image')
    .addClass('imagecell')
    .css({ width: '33%', 'text-align': 'center' })

  // ah ha
  // @CR2017-02-11
  // this was only being picked up on production
  // the titles need to stay within letter content now
  if ($('.SI-letter h1.campl-sub-title').text() == 'Letter') {
    // $(".SI-letter h1.campl-sub-title").html($(".SI-letter .block-cudl h2:first").text());
    // $(".SI-letter .block-cudl h2:first").remove();
    $('.SI-letter h1.campl-sub-title').remove()
  }
})

function adjustImageCrop() {
  $(
    '.campl-horizontal-teaser-img .content img,.campl-vertical-teaser-img .content img',
  ).each(function () {
    if ($(this).height() > $(this).width()) {
      $(this).css({
        position: 'relative',
        top: '-' + $(this).height() / 7 + 'px',
      })
    }
  })
}

$(window).on('resize', function () {
  $('.meet-people .file-image').each(function () {
    $(this).find('.content').height($(this).find('.content').width())
  })
  adjustImageCrop()
  adjustColumns()
})

function adjustColumns() {
  setTimeout(function () {
    if ($(window).width() > 767) {
      if (
        $('.campl-secondary-content .region-sidebar').height() >
        $('.campl-main-content').height()
      ) {
        $('.campl-main-content').height(
          $('.campl-secondary-content .region-sidebar').height() + 50,
        )
      }
    }
  }, 100)
}

$(window).on('load', function () {
  adjustImageCrop()

  var jsonData

  $('#block-block-36 .file-image .content').prepend(
    $('#block-block-36 .file-image .content img'),
  )

  adjustColumns()

  /*$(".search-result-item td b:contains('Classmark')").each(function(){
   var classmark = ( $(this).parent().next().text());

   $.getJSON( "/sites/all/modules/cudl/DAR-gateway.php?classmark="+escape(classmark), function( data) {
   if(data.error=="OK"){
   $(".search-result-item td:contains('"+data.classmark+"')").parent().parent().parent().parent().find(".summary").addClass("hasImage").prepend("<div class='letter-thumbmnail'><img src='"+data.images[0]+"' alt='thumbnail image of letter' /></div>");
   }
   });
   });

   if($("#letter_details").size()>0 && $(".source-of-text dd").size()>0){
   var classmark = $(".source-of-text dd").text();
   if(classmark.indexOf("DAR")!=-1){
   $.getJSON( "/sites/all/modules/cudl/DAR-gateway.php?classmark="+escape(classmark), function( data) {
   if(data.error=="OK"){
   //
   jsonData = data;
   /// load openseadragon
   $('#letter-extras').append("<div id='seadragoncontainer' style='width:100%;height:700px;background-color:black'/>");
   $.getScript( "/sites/all/modules/cudl/openseadragon.min.js" , function(){
   var viewer = OpenSeadragon({
   id:'seadragoncontainer',
   prefixUrl	:'/sites/all/modules/cudl/images/',
   tileSources: jsonData.dzi,
   sequenceMode: true,
   preserveViewport: true
   });
   });
   $(".region-content:first").prepend("<ul id='transcript-original-menu' class='tab-menu'><li id='transcriptLink' class='active'>Transcript</li><li id='scanLink'>Original</li></ul>");
   $("#seadragoncontainer").hide();
   $("#transcriptLink").on("click",function(){
   $("#seadragoncontainer").hide();
   $("#block-cudl-cudl").show();
   $("#letter-extras .box").show();
   $("#scanLink").removeClass("active");
   $(this).addClass("active");
   });
   $("#scanLink").on("click",function(){
   $("#seadragoncontainer").show();
   $("#block-cudl-cudl").hide();
   $("#letter-extras .box").hide();
   $("#transcriptLink").removeClass("active");
   $(this).addClass("active");
   });
   }
   });
   }

   }*/

  // images
  $('body').append(
    "<div id='imagemodal' class='remodal' data-remodal-id='imagemodal' ><div class='contentholder'></div></div>",
  )
  $('.file-image .content a').each(function () {
    if (
      $(this).attr('href').toLowerCase().indexOf('.jpg') != -1 ||
      $(this).attr('href').toLowerCase().indexOf('.png') != -1 ||
      $(this).attr('href').toLowerCase().indexOf('.gif') != -1
    ) {
      $(this).on('click', function () {
        $('#imagemodal .contentholder').html($(this).find('img').clone())
        var inst = $('#imagemodal').remodal()
        inst.open()
        return false
      })
    }
  })
  $('#imagemodal').on('contextmenu', 'img', function (e) {
    return false
  })

  var observer = new MutationObserver(function (mutations) {
    console.log('mutation')
    let letter = $('#cudl_content_container .letter')
    if (letter.length > 0) {
      console.log('element found!')
      letter.addClass('test')
      $('#cudl_content_container .letter .opener h1').css('max-width', '75%')
      letter.find('.opener').css('position', 'relative')
      let button = $(
        '<a href="#content_warning" class="footnotelink" style="position:absolute; top:1rem; right:0.2rem;font-size:1.25rem;"><sup id="back-mark-Lfoot_content_warning" class="footnote" data-target="" style="border:0.3rem solid black; padding: 2px 1em 4px;">Content warning</sup></a>',
      )
      letter.find('.opener').append(button)
      $('body').append(
        "<div id='content_warning' style='display:none;'>The letters contained on the Darwin Correspondence Project website may include content and language that is upsetting or offensive. This reflects the attitudes of the historical period in which they were written. This can include language that is racist, sexist, ableist, homophobic, and otherwise discriminatory and unacceptable today. <br/>See this page for a commentary on <a href='https://www.darwinproject.ac.uk/darwin-race-and-gender'>Charles Darwin’s views on race and gender</a>. <br/><a href='https://www.darwinproject.ac.uk/about/contact'>Contact us here</a>.</div>",
      )

      //letter.find(".opener").css("max-width", "calc(100%-6rem)");
      observer.disconnect()

      button.on('click', function (e) {
        openFootnoteModal(e, true)
        if ($('#footnotepopup').length == 0) {
          $('#footnotepopup').removeClass('click_open')
        } else {
          $('#footnotepopup').addClass('click_open')
        }
      })
      button.on('mouseenter', function (e) {
        if (
          $('#footnotepopup').length == 0 &&
          !$('#footnotepopup').hasClass('click_open')
        )
          setTimeout(function () {
            return openFootnoteModal(e, true)
          }, 10)
      })
      button.on('mouseleave', function (e) {
        if (
          $('#footnotepopup').length > 0 &&
          !$('#footnotepopup').hasClass('click_open') &&
          !$('#footnotepopup').is(':hover')
        ) {
          $('#footnotepopup').remove()
          $("sup[id^='back-mark']").removeClass('selectedFootnote')
        }
      })
    }
  })

  observer.observe(document, {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true,
  })
})

var urlParam = function (name, url) {
  if (!url) {
    url = window.location.href
  }
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url)
  if (!results) {
    return undefined
  }
  return results[1] || undefined
}
