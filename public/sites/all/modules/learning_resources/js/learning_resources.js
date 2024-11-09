;(function ($) {
  // $.fn.trans3d = function (o) {
  //   var o = $.extend({x: 0, y: 0, z: 0}, o);
  //   return this.each(function () {
  //     $(this).css({transform: 'translate3d(' + o.x + 'px, ' + o.y + 'px, ' + o.z + 'px)'});
  //   });
  // }

  Drupal.behaviors.learningResources = {
    attach: function (context, settings) {
      // // wrap and remodal - as long as not editing...
      // var outcomes = $('div.field-name-field-outcomes', context);
      // if (outcomes.length && !$('body').hasClass('page-node-edit')) {
      //   $('.node-learning-resources .field-name-body .field-item:last').prepend('<h3 class="button"><a data-remodal-target="outmocomes">Learning Outcomes...</a></h3>');
      //   outcomes.attr('data-remodal-id', 'outmocomes').remodal();
      // }

      // // wrap and remodal - as long as not editing...
      // var overlay = $('div.lr-overlay-wrap', context);
      // if (overlay.length && !$('body').hasClass('page-node-edit')) {
      //   overlay.remodal();
      // }

      // video content
      var iframeCount = 0
      $('iframe.lr-video', context)
        .once('processed')
        .each(function () {
          //        console.log($(this).parent());
          var p = $(this).parent().remodal()
          $(this).show()
        })

      // admin
      $('div.lr-admin-top select', context)
        .once('processed')
        .each(function (i, e) {
          var me = $(e)
          if (!me.attr('name').match(/\[type\]/)) {
            return
          }
          // multiple admin items in a table
          var container = me.closest('td')
          me.change(function () {
            switch (me.val()) {
              case 'presentation':
              case 'activity':
                container.find('div.lr-admin-video').hide()
                container.find('div.lr-admin-overlay').hide()
                container.find('div.lr-admin-attach').show()
                break
              case 'video':
                container.find('div.lr-admin-video').show()
                container.find('div.lr-admin-overlay').hide()
                container.find('div.lr-admin-attach').hide()
                break
              case 'discuss':
                container.find('div.lr-admin-video').hide()
                container.find('div.lr-admin-attach').hide()
                container.find('div.lr-admin-overlay').show()
                break
            }
          }).change()
        })

      // collapse
      $('div.field-name-field-discussion .collapse p').hide()
      $('div.field-name-field-discussion .collapse .suggested p').show()
      $(
        'div.field-name-field-discussion .collapse h4, div.field-name-field-discussion .collapse .suggested',
      )
        .on('click', function () {
          $(this).parent().find('p, ul').slideDown()
        })
        .css({ cursor: 'pointer' })
    },
  }

  // Level items - make all specified items the same height as the tallest

  Drupal.behaviors.levelItems = {
    // if less than min width, then don't apply
    _minWidth: 900,
    levelItems: function (el, selector) {
      var maxSize = 0
      var winWidth = $(window).width()

      if ($(el).find(selector).length > 0) {
        $(el)
          .find(selector)
          .each(function (p, q) {
            // Set height to auto so that heights can be recalculated if needed
            $(this).css('height', 'auto')
            // force reflow
            this.offsetHeight

            // Find the max height
            if (maxSize < $(q).height()) {
              maxSize = $(q).height()
            }
          })

        // only if min width satisfied
        if (winWidth > Drupal.behaviors.levelItems._minWidth) {
          // Don't add the height attribute if attribute has no height
          if (maxSize !== 0) {
            $(el).find(selector).height(maxSize)
          }
        }
        return true
      } else {
        return false
      }
    },

    attach: function (context, settings) {
      setTimeout(function () {
        var items = $('div.field-type-learning-resources-item', context)
        if (!items.hasClass('leveling')) {
          items.addClass('leveling')
          Drupal.behaviors.levelItems.levelItems(items, '.lr-inner')
          var timerID = 0
          $(window).resize(function () {
            if (timerID) {
              clearTimeout(timerID)
              timerID = 0
            }
            timerID = setTimeout(function () {
              timerID = 0
              Drupal.behaviors.levelItems.levelItems(items, '.lr-inner')
            }, 250)
          })
        }
      }, 0)
    },
  }

  // Level pairs of items - even -> odd

  Drupal.behaviors.levelPair = {
    // if less than min width, then don't apply
    _minWidth: 900,
    levelPair: function (a) {
      var maxSize = 0
      var winWidth = $(window).width()

      for (var i = 0; i < a.length; ++i) {
        // Set height to auto so that heights can be recalculated if needed
        a[i].css('height', 'auto')
        // force reflow
        a[i][0].offsetHeight

        // Find the max height
        if (maxSize < a[i].height()) {
          maxSize = a[i].height()
        }
      }

      // only if min width satisfied
      if (winWidth > Drupal.behaviors.levelPair._minWidth) {
        // Don't add the height attribute if attribute has no height
        if (maxSize !== 0) {
          for (var i = 0; i < a.length; ++i) {
            a[i].height(maxSize)
          }
        }
      }
      return true
    },

    attach: function (context, settings) {
      setTimeout(function () {
        var items = $('div.lr-nodes', context)
        if (!items.hasClass('pairing')) {
          items.addClass('pairing')
          items.find('.even').each(function (i, e) {
            var even = $(e)
            var odd = even.next('.odd')
            if (odd.length) {
              var a = [even.find('.lr-inner'), odd.find('.lr-inner')]

              Drupal.behaviors.levelPair.levelPair(a)
              var timerID = 0
              $(window).resize(function () {
                if (timerID) {
                  clearTimeout(timerID)
                  timerID = 0
                }
                timerID = setTimeout(function () {
                  timerID = 0
                  Drupal.behaviors.levelPair.levelPair(a)
                }, 250)
              })
            }
          })
        }
      }, 0)
    },
  }

  Drupal.behaviors.revealText = {
    attach: function (context, settings) {
      $('div.lr-reveal-button a', context).each(function (i, e) {
        var me = $(this)
        if (me.hasClass('processed')) {
          return
        }
        me.addClass('processed')
        me.click(function () {
          var p = $(this).closest('.lr-reveal')
          var content = p.find('.lr-reveal-content')
          if (content.hasClass('revealed')) {
            content.removeClass('revealed')
            $(this).removeClass('revealed')
            $(this).text($(this).data('original'))
            // // IE button width hack
            // me.width(me.data('bwidth')+32);
          } else {
            content.addClass('revealed')
            $(this).addClass('revealed')
            if (!$(this).data('original')) {
              $(this).data('original', $(this).text())
            }
            $(this).text('Hide')
            // // IE button width hack
            // me.width(50);
          }
          return false
        })

        // // IE issues - start off as inline block
        // // get width, then become display:block
        // var w = me.width();
        // me.data('bwidth', w);
        // me.css({display:'block', width:w+'px'});
      })
    },
  }
})(jQuery)
