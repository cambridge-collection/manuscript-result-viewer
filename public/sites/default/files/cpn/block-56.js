$_ = jQuery
var timer
$_(function () {
  $_('.region-sidebar').append(
    $_('.field-name-field-side-text').wrap(
      "<div class='campl-content-container' />",
    ),
  )
  var totalItems = $_(
    '.field-name-field-quotes > .field-items > .field-item',
  ).length
  //
  $_('.field-name-field-quotation-credit').each(function () {
    var citationText = $_(this).text()
    if (citationText != undefined) {
      citationText = citationText.replace(/\s\*(.)/g, ' <em>$1')
      citationText = citationText.replace(/(.)\*\s/g, '$1</em> ')
      $(this).html(citationText)
    }
  })

  var index = 0
  if (totalItems > 1) {
    $_('.field-name-field-quotes').append("<div id='quote_controls' />")

    for (var n = 0; n < totalItems; n++) {
      $_('#quote_controls').append('<span>' + (n + 1) + '</span>')
      $_('#quote_controls span').on('click', function () {
        $_('#quote_controls span').removeClass('selected')
        $_(this).addClass('selected')
        clearTimeout(timer)
        window.location.hash = 'quote' + $_(this).text()
        $_('.field-name-field-quotes > .field-items > .field-item').hide()
        $_('.field-name-field-quotes  > .field-items > .field-item')
          .eq($_(this).text() - 1)
          .show()
        if (ga != undefined) {
          ga('send', 'event', 'Quotes', 'change', $_(this).text() - 1)
        }
      })
    }
    $_('#quote_controls span:first').addClass('selected')
    $_('.field-name-field-quotes  > .field-items > .field-item').hide()
    $_('.field-name-field-quotes  > .field-items > .field-item:first').show()
    if (window.location.hash != '') {
      var hash = window.location.hash.split('#quote').join('')
      hash = Number(hash)
      $_('#quote_controls  span')
        .eq(hash - 1)
        .click()
    }
    timer = setInterval(function () {
      $_('.field-name-field-quotes  > .field-items > .field-item').hide()
      $_('.field-name-field-quotes  > .field-items > .field-item')
        .eq(index)
        .show()
      $_('#quote_controls span').removeClass('selected')
      $_('#quote_controls span').eq(index).addClass('selected')
      index++
      if (index >= totalItems) {
        index = 0
      }
    }, 7000)
  }
  $_('.field-name-field-quotation-credit').on('click', function () {
    var link = $_(this).parent().find('.field-name-field-quotation-link').text()
    if ($_.trim(link) != '') {
      window.location.href = link
    }
  })

  $_('.field-collection-item-field-related-pages').on('click', function () {
    var link = $_(this).find('.field-name-field-related-url').text()
    if ($_.trim(link) != '') {
      window.location.href = link
    }
  })
})
$_(window).on('load', function () {
  var quoteHeight = 150

  $_('.field-name-field-quotes  > .field-items > .field-item').each(
    function () {
      quoteHeight = Math.max($_(this).height(), quoteHeight)
    },
  )

  $_('.field-name-field-quotes  > .field-items > .field-item').height(
    quoteHeight,
  )
})
