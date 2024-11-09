;(function ($) {
  Drupal.behaviors.cudlAlbum = {
    viewer: null,
    currentPage: 0,
    rotation: 0,
    data: {
      logicalStructures: [],
      descriptiveMetadata: [],
      pages: [],
    },
  }

  // just too much to type
  var cudlAlbum = Drupal.behaviors.cudlAlbum

  cudlAlbum.embedInNode = function (container) {
    var dataUrl = container.attr('data-url')
    var tpl =
      '\
  <div id="about-photo"></div>\
      <div class="cudl-album">\
  <div id="toolbarDiv" class="toolbar"\
    style="position: relative;clear: both;overflow: hidden;">\
      <span style="float:right;margin:10px 20px 0 0">\
      <a class="ibtn" id="zoom-in" href="#zoom-in" title="Zoom in"\
    style="display: inline-block; position: relative;">Zoom In</a>\
    <a class="ibtn" id="zoom-out" href="#zoom-out" title="Zoom out"\
    style="display: inline-block; position: relative;">Zoom Out</a>\
    <a class="ibtn" id="rotR" href="#rotate-right" title="Rotate Right"\
    style="display: inline-block; position: relative;">Rotate Right</a>\
    <a class="ibtn" id="rotL" href="#rotate-left" title="Rotate Left"\
    style="display: inline-block; position: relative;">Rotate Left</a>\
    <a id="full-page" href="#full-page" title="Toggle full page"\
    style="display: inline-block; position: relative;">Full Page</a>\
    </span>\
    <span style="float:left;margin:10px 0 0 20px">\
      <a class="ibtn" id="previous" href="#previous-page" title="Previous page"\
    style="display: inline-block; position: relative; opacity: 0.2;">Previous</a>\
      <span id="currentPage"></span><span id="of"> of </span><span id="numPages"></span>\
      <a class="ibtn" id="next" href="#next-page" title="Next page"\
    style="display: inline-block; position: relative;">Next</a>\
      </span>\
      <div\
    style="background: none transparent; border: none; margin: 0px; padding: 0px; position: static; width: 100%; height: 100%;">\
      <div\
    style="background: none transparent; border: none; margin: 0px; padding: 0px; position: absolute; left: 0px; top: 0px;"></div>\
      <div\
    style="background: none transparent; border: none; margin: 0px; padding: 0px; position: absolute; right: 0px; top: 0px;"></div>\
      <div\
    style="background: none transparent; border: none; margin: 0px; padding: 0px; position: absolute; right: 0px; bottom: 0px;"></div>\
      <div\
    style="background: none transparent; border: none; margin: 0px; padding: 0px; position: absolute; left: 0px; bottom: 0px;"></div>\
      </div>\
      </div>\
      <div id="albumcontainer" data-url="' +
      dataUrl +
      '" class="cudl-album-inner">\
      </div>\
      </div>'

    container.html(tpl)
    $('body').addClass('node-type-cudl-photo-album')
  }

  cudlAlbum.attach = function (context) {
    // check for "cudl_album_embed"
    var embed = $('#cudl_album_embed', context)
    if (embed.length && !embed.hasClass('embedded') && embed.attr('data-url')) {
      cudlAlbum.embedInNode(embed)
      embed.addClass('embedded')
      cudlAlbum.attach(context)
      return
    }

    var container = $('#albumcontainer', context)
    if (container.length == 0 || container.hasClass('attached')) {
      return
    }

    // ensure OpenSeadragon is loaded
    if (typeof OpenSeadragon == 'undefined') {
      jQuery.getScript(
        '/sites/all/modules/cudl/openseadragon.min.js',
        function () {
          cudlAlbum.attach(context)
        },
      )
      return
    }

    // attach AFTER load sea dragon
    container.addClass('attached')

    var inp = $('#cudlAlbumData')
    if (inp.length == 0) {
      $.post(
        '/cudlalbum/json',
        { dataUrl: container.attr('data-url') },
        function (data) {
          cudlAlbum.data = data
          cudlAlbum.weGotData(context)
        },
      )

      // if (console) console.error('JSON data not available');
      return
    }

    try {
      cudlAlbum.data = JSON.parse(inp.val())
    } catch (e) {
      if (console) {
        console.error(e)
      }
      return
    }
    cudlAlbum.weGotData(context)
  }

  cudlAlbum.weGotData = function (context) {
    AdvancedSearch.overrideSidebar = true
    AdvancedSearch.setSidebarVisibility()

    if (console) console.log({ album: cudlAlbum.data })

    cudlAlbum.show()
  }

  // cudlAlbum.load = function(dataUrl) {
  //   $.get(dataUrl, function (data) {
  //     cudlAlbum.data = data;
  //
  //     cudlAlbum.show();
  //   });
  // };

  cudlAlbum.getTileSources = function () {
    var r = []
    for (var i = 0; i < cudlAlbum.data.pages.length; ++i) {
      var p = cudlAlbum.data.pages[i]
      r.push('https://images.lib.cam.ac.uk/' + p.displayImageURL)
    }
    return r
    // [
    //   'https://image01.cudl.lib.cam.ac.uk/content/images/PH-Y-30448-F-000-00001.dzi',
    //   'https://image01.cudl.lib.cam.ac.uk/content/images/PH-Y-30448-F-000-00002.dzi'
    // ]
  }

  cudlAlbum.show = function () {
    cudlAlbum.viewer = OpenSeadragon({
      id: 'albumcontainer',
      toolbar: 'toolbarDiv',
      zoomInButton: 'zoom-in',
      zoomOutButton: 'zoom-out',
      homeButton: 'home',
      fullPageButton: 'full-page',
      nextButton: 'next',
      previousButton: 'previous',
      // showNavigator:  true,
      prefixUrl: '/sites/all/modules/cudl/images/',
      tileSources: cudlAlbum.getTileSources(),
      sequenceMode: true,
    })

    setTimeout(function () {
      $('a#previous').click(function () {
        if (cudlAlbum.currentPage > 0) {
          --cudlAlbum.currentPage
          cudlAlbum.addPageInformation()
          cudlAlbum.highlightContents()
          $('.campl-secondary-content').trigger('reconfigure')
        }
      })
      $('a#next').click(function () {
        if (cudlAlbum.currentPage < cudlAlbum.data.pages.length - 1) {
          ++cudlAlbum.currentPage
          cudlAlbum.addPageInformation()
          cudlAlbum.highlightContents()
          $('.campl-secondary-content').trigger('reconfigure')
        }
      })
      $('a#rotR').click(function () {
        cudlAlbum.rotation = (cudlAlbum.rotation + 90) % 360
        cudlAlbum.viewer.viewport.setRotation(cudlAlbum.rotation)
        return false
      })
      $('a#rotL').click(function () {
        cudlAlbum.rotation = (cudlAlbum.rotation + 270) % 360
        cudlAlbum.viewer.viewport.setRotation(cudlAlbum.rotation)
        return false
      })
      // $('a#home').click(function () {
      //   if (cudlAlbum.currentPage != 0) {
      //     cudlAlbum.currentPage = 0;
      //     cudlAlbum.addPageInformation();
      //   }
      // });
      cudlAlbum.fillSideBar()
    }, 250)
  }

  cudlAlbum.fillSideBar = function () {
    AdvancedSearch.setSidebarVisibility()

    var region_sidebar = $('div.region-sidebar')
    // console.log(region_sidebar.length);
    var container = region_sidebar.find('div.albumInfo')
    if (container.length == 0) {
      container = $('<div class="albumInfo"></div>')

      var rl = $('#block-cudl-related-letters')
      if (rl.length) {
        rl.after(container)
      } else {
        region_sidebar.append(container)
      }
    }

    // reset
    container.html(
      // '<div id="about-abstract"></div>' +
      '<div id="about-page"></div>' + '<div id="album-contents"></div>',
    )
    //    cudlAlbum.addAlbumInformation();
    cudlAlbum.addPageInformation()
    cudlAlbum.addContents()
    cudlAlbum.highlightContents()
  }

  cudlAlbum.addAlbumInformation = function () {
    var region_sidebar = $('div.region-sidebar')
    var container = region_sidebar.find('div.albumInfo')

    var structures = cudlAlbum.data.logicalStructures[0]
    var meta = cudlAlbum.data.descriptiveMetadata[0]
    //    console.log({meta:meta});

    // container.find('h2:first').text(structures.label);

    var abstract = $('#about-abstract', container)
    abstract.children().remove()

    var panel = $('<div class="panel"></div>')
    abstract.append(panel)
    var inner = $('<div class="inner"></div>')
    panel.append(inner)

    inner.append($('<h2></h2>').text('Information about this album'))

    var ul = $('<div class="group"></div>')
    inner.append(ul)

    var keys = ['physicalLocation', 'shelfLocator', 'title', 'level']
    for (var i = 0; i < keys.length; ++i) {
      var li = $('<div class="item"></div>')
      li.append($('<div class="label"></div>').text(meta[keys[i]].label + ': '))
      li.append($('<div class="value"></div>').html(meta[keys[i]].displayForm))
      ul.append(li)
    }
  }

  cudlAlbum.addPageInformation = function () {
    var region_sidebar = $('div.region-sidebar')
    var container = region_sidebar.find('div.albumInfo')

    var page = cudlAlbum.data.pages[cudlAlbum.currentPage]

    $('#currentPage').text(cudlAlbum.currentPage + 1)
    $('#numPages').text(cudlAlbum.data.pages.length)

    // container.find('h2:first').text(structures.label);

    var mainAbout = $('#about-photo')
    mainAbout.html('')

    var about = $('#about-page') //, container);
    if (!about.length) {
      var about = $('<div id="about-page"></div>')
      container.append(about)
    }
    about.children().remove()

    if (!page) {
      if (console) {
        console.error(
          'currentPage out of bounds',
          cudlAlbum.currentPage,
          cudlAlbum.data,
        )
      }
      return
    }

    if (!page.physID) {
      if (console) {
        console.error(
          'page.physID not found',
          cudlAlbum.currentPage,
          cudlAlbum.data,
        )
      }
      return
    }

    // look up child by PHYS-ID
    var meta = cudlAlbum.findMetaForPage(page)
    if (!meta) {
      // if (console) {
      //   console.warn('no meta found', cudlAlbum.currentPage, cudlAlbum.data);
      // }
      return
    }

    // "title" is a long block of text for these albums
    // put in MAIN content under photo
    var html = meta['title'].displayForm
    var matches
    if (html && (matches = html.match(/(http[s]?:\/\/[^"< )]+)/))) {
      html = html.replace(
        matches[1],
        '<a href="' + matches[1] + '">' + matches[1] + '</a>',
      )
    }
    // console.log({html:html});

    var hdr = $('<div></div>').html(html)
    mainAbout.append(hdr)

    var panel = $('<div class="panel"></div>')
    about.append(panel)
    var inner = $('<div class="inner"></div>')
    panel.append(inner)

    inner.append($('<h2></h2>').text('About this photograph'))

    var ul = $('<div class="group"></div>')
    inner.append(ul)

    var keys = ['reference' /*, 'title'*/, 'abstract']
    var has = 0
    for (var i = 0; i < keys.length; ++i) {
      if (meta[keys[i]]) {
        ++has
        var li = $('<div class="item"></div>')
        li.append(
          $('<div class="label"></div>').text(meta[keys[i]].label + ': '),
        )
        li.append(
          $('<div class="value"></div>').html(meta[keys[i]].displayForm),
        )
        ul.append(li)
      }
    }

    if (has) {
      about.show()
    } else {
      about.hide()
    }

    setTimeout(function () {
      $(window).resize()
    }, 0)
  }

  cudlAlbum.findChildForPage = function (page) {
    var children = cudlAlbum.data.logicalStructures[0].children
    // look up child by PHYS-ID
    for (var i = 0; i < children.length; ++i) {
      var m = children[i]
      if (m.startPageID == page.physID) {
        return m
      }
    }

    // if (console) {
    //   console.warn('no child found', page);
    // }
    return false
  }

  cudlAlbum.findMetaForPage = function (page) {
    // look up child by PHYS-ID
    var child = cudlAlbum.findChildForPage(page)
    if (!child) {
      return false
    }

    for (var i = 0; i < cudlAlbum.data.descriptiveMetadata.length; ++i) {
      var m = cudlAlbum.data.descriptiveMetadata[i]
      if (m.ID == child.descriptiveMetadataID) {
        return m
      }
    }

    if (console) {
      console.warn('no metadata found', page)
    }
    return false
  }

  cudlAlbum.addContents = function () {
    var region_sidebar = $('div.region-sidebar')
    var container = region_sidebar.find('div.albumInfo')

    var pages = cudlAlbum.data.pages

    var contents = $('#album-contents', container)
    if (!contents.length) {
      var contents = $('<div id="album-contents"></div>')
      container.append(contents)
    }
    contents.children().remove()

    var panel = $('<div class="panel"></div>')
    contents.append(panel)
    var inner = $('<div class="inner"></div>')
    panel.append(inner)
    inner.append($('<h2></h2>').text('Album Contents'))

    var ul = $('<div class="group"></div>')
    inner.append(ul)

    // had to extract to avoid referencing issue
    function addClick(li, pg) {
      li.click(function () {
        cudlAlbum.currentPage = pg
        cudlAlbum.viewer.goToPage(pg)
        cudlAlbum.addPageInformation()
        cudlAlbum.highlightContents()
      })
    }

    for (var i = 0; i < pages.length; ++i) {
      var meta = cudlAlbum.findMetaForPage(pages[i])
      if (!meta) {
        continue
      }

      var li = $('<div class="item" data-idx="' + i + '"></div>')

      if (i == 0) {
        li.addClass('first')
      }
      if (i == pages.length - 1) {
        li.addClass('last')
      }

      // li.append($('<div class="label"></div>').text(meta[keys[i]].label + ': '));
      li.append($('<div class="title"></div>').html(meta['title'].displayForm))
      ul.append(li)
      addClick(li, i)
    }

    // console.log({html: contents.html()});
  }

  cudlAlbum.highlightContents = function () {
    var region_sidebar = $('div.region-sidebar')
    var container = region_sidebar.find('div.albumInfo')
    var contents = $('#album-contents', container)
    contents.find('.item').removeClass('active')
    contents.find('[data-idx=' + cudlAlbum.currentPage + ']').addClass('active')
  }
})(jQuery)
