/**
 * Created by paul on 20/07/2016.
 */
;(function ($) {
  var gender = {}
  var pageAssetsDir = '/sites/all/modules/darwin_kids_timeline/'

  /**
   * jQuery ready
   */
  $(document).ready(function () {
    if ($('body').hasClass('kids-timeline-page')) {
      $('div.campl-page-header').eq(2).hide()
      $('div.stopHead').wrapInner('<div class="stopHeadInner"></div>')
      $('div.stopContent').wrapInner('<div class="stopContentInner"></div>')
      gender.loadData()
    }
  })

  // load the external letters
  gender.loadData = function () {
    $.ajax({
      url: pageAssetsDir + 'data/assets.json',
      dataType: 'json',
      success: function (messageData) {
        gender.data = messageData.assets
        gender.wireEvents()
      },
      error: function () {},
    })
  }

  /**
   * Wire the events section
   */
  gender.wireEvents = function () {
    //$('html, body').scrollTop(0);
    window.location.replace('#/')

    $(window).hashchange(function () {
      if (location.hash != '#overlay') {
        closeBox()
      }
    })

    /*
     * Bind the scrollDown button
     */
    $('#scrollButton').click(function () {
      var elementClicked = $('#stop1')
      var destination = $(elementClicked).offset().top
      $('html:not(:animated),body:not(:animated)').animate(
        { scrollTop: destination },
        500,
      )
      return false
    })

    // To top button
    $('.toTopButton').click(function (e) {
      var goto =
        parseInt(
          $(this).parent().parent().parent().attr('id').replace('stop', ''),
        ) - 1
      var destination

      if (goto == 11) {
        var elementClicked = $('#headerContent h1')
        destination = $(elementClicked).offset().top
      } else {
        destination =
          $('#stop' + goto + ' .stopHead .stopQuickNav').offset().top - 40
      }

      $('html:not(:animated),body:not(:animated)').animate(
        { scrollTop: destination },
        500,
      )
      e.preventDefault()
    })

    // This buttons brings you to the next stop in the timeline
    $('.toBottomButton').click(function () {
      var goto =
        parseInt(
          $(this).parent().parent().parent().attr('id').replace('stop', ''),
        ) + 1

      var destination =
        $('#stop' + goto + ' .stopHead .stopQuickNav').offset().top - 40
      $('html:not(:animated),body:not(:animated)').animate(
        { scrollTop: destination },
        500,
      )
    })

    // Open letters
    $('.showMaterialButton').click(function () {
      window.location.hash = 'overlay'

      $('#timeBar').fadeOut()
      var person = $(this).parent().parent().find('h2').html()

      $('#overlay').fadeIn('fast', function () {
        $('#box').animate({ top: '60px' }, 500)
      })

      // Show the right letter data
      $('#box h2').html('Materials for ' + person)
      $('#assetContainer').empty()

      // Data
      var id = $(this).attr('goto')
      var myData = gender.data[id]

      // Create a menu that shows all assets within this stop
      $('#letterTitle').hide()
      $('#diaryTitle').hide()
      $('#otherTitle').hide()

      var letterString = '',
        diaryString = '',
        otherString = ''
      $(myData).each(function (index, element) {
        //@CR2016-07-25 -- if no URL yet, just skip
        if (element.url != '') {
          if (element.type === 'letter') {
            letterString += '<li>'
            //            letterString += "<a href='javascript:;' class='assetLink' dataid='" + index + "'>- " + element.title + "</a>";

            //@CR2016-07-25 - just link to letter
            letterString +=
              "<a href='" +
              element.url +
              "' class='assetLink' dataid='" +
              index +
              "'>- " +
              element.title +
              '</a>'
            letterString +=
              "<span class='summary'>" + element.summary + '</span>'
            letterString += '</li>'

            $('#letterTitle').show()
          } else if (element.type === 'diary') {
            diaryString +=
              "<li><a href='" +
              element.url +
              "' class='assetLink' dataid='" +
              index +
              "'>- " +
              element.title +
              '</a></li>'
            $('#diaryTitle').show()
          } else {
            otherString +=
              "<li><a href='" +
              element.url +
              "' class='assetLink' dataid='" +
              index +
              "'>- " +
              element.title +
              '</a></li>'
            $('#otherTitle').show()
          }
        }
      })

      $('#letterMenu').empty().append(letterString)
      $('#diaryMenu').empty().append(diaryString)
      $('#otherMenu').empty().append(otherString)

      // Show external assets
      $('.assetLink').click(function () {
        $('#assetContainer').empty()
        $('#assetContainer').append(
          '<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>',
        )

        $.ajax({
          url: pageAssetsDir + '/data/' + myData[$(this).attr('dataid')].url,
          dataType: 'html',
          success: function (assetData) {
            $('#assetContainer').html(assetData)
            $('#assetContainer').scrollTop(0)
            layout()
          },
          error: function () {},
        })
      })

      var currentScrollPosition = $('html').scrollTop()
      $('html').css('overflow', 'hidden').scrollTop(currentScrollPosition)
      layout()
    })

    // Close letters
    $('.boxclose').click(function () {
      history.back()
    })
    $('#overlay').click(function () {
      history.back()
    })

    // Position the years
    $('.historyCollectionWrapper .year').each(function (index) {
      $(this).css(
        'margin-top',
        $(this).next().offset() -
          $(this).offset() +
          ($(this).next().height / 2 - $(this).height() / 2),
      )
    })

    if ($.browser.opera) {
      $('#stop7').css('background-position', '20px 350px')
    }

    if ($.browser.msie) {
      $('#stopContainer>li').each(function () {
        $(this).attr(
          'originalBackgroundPosition',
          $(this).css('background-position-x').replace('px', ''),
        )
      })

      $('#stopContainer>li')
        .children()
        .each(function () {
          $(this).attr(
            'originalBackgroundPosition',
            $(this).css('background-position-x').replace('px', ''),
          )
        })
    } else {
      $('#stopContainer>li').each(function () {
        $(this).attr(
          'originalBackgroundPosition',
          $(this).css('background-position').split(' ')[0].replace('px', ''),
        )
      })

      $('#stopContainer>li')
        .children()
        .each(function () {
          $(this).attr(
            'originalBackgroundPosition',
            $(this).css('background-position').split(' ')[0].replace('px', ''),
          )
        })
    }

    // resize
    $(window).resize(layout)
    layout()
  }

  // Close the asset dialog
  function closeBox() {
    $('#box').animate({ top: -$('#box').height() - 70 }, 500, function () {
      $('#overlay').fadeOut('fast')
      $('.transcript').hide()

      $('#timeBar').fadeIn()

      var currentScrollPosition = $('html').scrollTop()
      $('html').css('overflow', 'auto').scrollTop(currentScrollPosition)
      layout()
    })
  }

  // Resize the layout
  function layout(e) {
    var fixedWidth = 980
    //*
    if ($(window).width() > fixedWidth) {
      var singlePaddingWidth = ($(window).width() - fixedWidth) / 2
      //      $('#timeline-content').width($(window).width());

      if ($.browser.msie) {
        $('#stopContainer>li').each(function (index) {
          $(this).css(
            'background-position-x',
            parseInt($(this).attr('originalBackgroundPosition'), 10) +
              singlePaddingWidth +
              'px',
          )
        })

        $('#stopContainer>li')
          .children()
          .each(function (index) {
            $(this).css({
              paddingLeft: singlePaddingWidth,
              paddingRight: singlePaddingWidth,
              backgroundPositionX:
                parseInt($(this).attr('originalBackgroundPosition'), 10) +
                singlePaddingWidth +
                'px',
            })
          })
      } else {
        $('#stopContainer>li').each(function (index) {
          $(this).css(
            'background-position',
            parseInt($(this).attr('originalBackgroundPosition'), 10) +
              singlePaddingWidth +
              'px' +
              ' ' +
              $(this).css('background-position').split(' ')[1],
          )
        })

        $('#stopContainer>li')
          .children()
          .each(function (index) {
            $(this).css({
              paddingLeft: singlePaddingWidth,
              paddingRight: singlePaddingWidth,
              backgroundPosition:
                parseInt($(this).attr('originalBackgroundPosition'), 10) +
                singlePaddingWidth +
                'px' +
                ' ' +
                $(this).css('background-position').split(' ')[1],
            })
          })
      }
    }
    //*/

    $('#box').css('height', 'auto')
    $('#box #assetContainer').css('height', 'auto')

    var boxHeight = $('#box').height() - $('#box #assetContainer').height()

    if ($('#box').height() > $(window).height() - 150) {
      $('#box').css({
        height: $(window).height() - 150,
        minHeight: boxHeight,
      })

      if ($('#box').height() - $('#box #assetContainer').position().top < 0) {
        $('#box #assetContainer').css('height', 0)
      } else {
        $('#box #assetContainer').css({
          height: $('#box').height() - $('#box #assetContainer').position().top,
        })
      }
    }

    $('#box').css({
      left: ($(window).width() - $('#box').width()) / 2,
    })
  }
})(jQuery)

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
;(function ($, e, b) {
  var c = 'hashchange',
    h = document,
    f,
    g = $.event.special,
    i = h.documentMode,
    d = 'on' + c in e && (i === b || i > 7)
  function a(j) {
    j = j || location.href
    return '#' + j.replace(/^[^#]*#?(.*)$/, '$1')
  }
  $.fn[c] = function (j) {
    return j ? this.bind(c, j) : this.trigger(c)
  }
  $.fn[c].delay = 50
  g[c] = $.extend(g[c], {
    setup: function () {
      if (d) {
        return false
      }
      $(f.start)
    },
    teardown: function () {
      if (d) {
        return false
      }
      $(f.stop)
    },
  })
  f = (function () {
    var j = {},
      p,
      m = a(),
      k = function (q) {
        return q
      },
      l = k,
      o = k
    j.start = function () {
      p || n()
    }
    j.stop = function () {
      p && clearTimeout(p)
      p = b
    }
    function n() {
      var r = a(),
        q = o(m)
      if (r !== m) {
        l((m = r), q)
        $(e).trigger(c)
      } else {
        if (q !== m) {
          location.href = location.href.replace(/#.*/, '') + q
        }
      }
      p = setTimeout(n, $.fn[c].delay)
    }
    $.browser.msie &&
      !d &&
      (function () {
        var q, r
        j.start = function () {
          if (!q) {
            r = $.fn[c].src
            r = r && r + a()
            q = $('<iframe tabindex="-1" title="empty"/>')
              .hide()
              .one('load', function () {
                r || l(a())
                n()
              })
              .attr('src', r || 'javascript:0')
              .insertAfter('body')[0].contentWindow
            h.onpropertychange = function () {
              try {
                if (event.propertyName === 'title') {
                  q.document.title = h.title
                }
              } catch (s) {}
            }
          }
        }
        j.stop = k
        o = function () {
          return a(q.location.href)
        }
        l = function (v, s) {
          var u = q.document,
            t = $.fn[c].domain
          if (v !== s) {
            u.title = h.title
            u.open()
            t && u.write('<script>document.domain="' + t + '"</script>')
            u.close()
            q.location.hash = v
          }
        }
      })()
    return j
  })()
})(jQuery, this)
